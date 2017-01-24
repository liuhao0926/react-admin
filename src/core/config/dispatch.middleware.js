function fetchProxy({ uri, options, type, dispatch }) {
    dispatch({ type: `${type}_REQUEST` });
    return fetch(uri, options, type)
        .then(response => {
            dispatch({
                type: `${type}_SUCCESS`,
                data: response
            });
        })
        .catch(error => {
            dispatch({
                type: `${type}_FAILURE`,
                reason: error
            });
        });    
}

export default function dispatchMiddleware() {
    return ({ dispatch }) => next => (action) => {
        if (!action || !action.fetchConfig) {
            return next(action);
        }
        const { fetchConfig, type } = action;
        const config = Object.assign({}, fetchConfig);
        const { uri, options } = config;
        return fetchProxy({ uri, options, type, dispatch });
    };
}