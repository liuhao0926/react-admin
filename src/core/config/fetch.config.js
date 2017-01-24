// require('es6-promise').polyfill();
// Uses Emscripten stategy for determining environment
import * as types from 'actions/userAccount/types';
import { browserHistory } from 'react-router';
import Auth from 'utils/auth';
let interceptors = [];
function interceptor(fetch, ...args) {
    const reversedInterceptors = interceptors.reduce((array, interceptor) => [interceptor].concat(array), []);
    let promise = Promise.resolve(args);
    // Register request interceptors
    reversedInterceptors.forEach(({ request, requestError }) => {
        if (request || requestError) {
            promise = promise.then(args => request(...args), requestError);
        }
    });

    // Register fetch call
    promise = promise.then(args => fetch(...args));

    // Register response interceptors
    reversedInterceptors.forEach(({ response, responseError }) => {
        if (response || responseError) {
            promise = promise.then(res => response(res, args), responseError);
        }
    });

    return promise;
}

function attach(env) {
    // Make sure fetch is avaibale in the given environment
    env.fetch = (function (fetch) {
        return function (...args) {
            return interceptor(fetch, ...args);
        };
    })(env.fetch);
}

attach(window);
const fetchIntercept = {
    register(interceptor) {
        interceptors.push(interceptor);
        return () => {
            const index = interceptors.indexOf(interceptor);
            if (index >= 0) {
                interceptors.splice(index, 1);
            }
        };
    },
    clear() {
        interceptors = [];
    }
};
function handleErrorData(response, json) {
    const errorInfos = {
        status: response.status,
        statusText: response.statusText,
        data: []
    };
    if (response.status >= 500) {
        errorInfos.data[0] = `${response.status} ${response.statusText}`;
    } else {
        if ($$.isArray(json)) {
            json.forEach(err => {
                errorInfos.data.push(err.error_description);
            });
        } else if ($$.isObject(json)) {
            errorInfos.data.push(...Object.values(json));
        }
    }
    return errorInfos;
}
function handleResponseOk(response, resolve) {
    return response.json()
        .then(json => resolve(json))
        .catch(() => {
            console.info('Response Not an json object');
            resolve(response);
        }); 
}
function handleResponseError(response, reject) {
    return response.json()
        .then(json => {
            reject(handleErrorData(response, json));
        })
        .catch(() => {
            console.info('Response Not an json object');
            reject(handleErrorData(response));
        });     
}
export default function (dispatch) {
    return fetchIntercept.register({
        request(url, config = {}, dispatchType) {
            const baseConfig = {
                method: 'GET',
                credentials: 'same-origin',
                mode: 'cors',
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json; charset=utf-8',
                }
            };
            config = Object.assign({}, baseConfig, config);
            if (Auth.loggedIn() && url.indexOf('amap.com') === -1) {
                const { Token } = Auth.getToken();
                config.headers.Authorization = `Bearer ${Token}`; 
            }
            if (!/^\/\/[^ "]+$/.test(url)) {
                url = `${API + url}`;
            }
            return [url, config, dispatchType];
        },

        requestError(error) {
            console.warn('requestError', error);
            return Promise.reject(error);
        },

        response(response, requestArgs) {
            return new Promise((resolve, reject) => {
                const status = response.status;
                switch (true) {
                    case (status >= 200 && status < 300):
                        // response.ok
                        return handleResponseOk(response, resolve, reject);
                    case (status === 401):
                        dispatch({
                            type: `${types.REFRESH_TOKEN}_START`
                        });
                        return Auth.refreshToken()
                            .then(user => {
                                dispatch({
                                    type: `${types.REFRESH_TOKEN}_SUCCESS`,
                                    userData: user
                                });
                                const [uri, options, dispatchType] = requestArgs;
                                if ($$.isDefined(dispatchType)) {
                                    return dispatch({
                                        type: dispatchType,
                                        fetchConfig: { uri, options }
                                    });
                                } else {
                                    return fetch(uri, options)
                                        .then(res => handleResponseOk(res, resolve, reject))
                                        .catch(err => handleResponseError(err, reject));
                                }
                            })
                            .catch(error => {
                                console.info(error);
                                dispatch({
                                    type: `${types.REFRESH_TOKEN}_FAILURE`,
                                    data: error
                                });
                                return browserHistory.push({ pathname: '/login' });
                            });

                }
                return handleResponseError(response, reject);
                
            });
        },

        responseError(error) {
            console.warn('responseError', error);
            return Promise.reject({
                status: -1,
                statusText: error.toString(),
                data: [error.toString()]
            });
        }
    });    
}