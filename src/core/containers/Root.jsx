import fetchIntercepter from '../config/fetch.config';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { routes, routesNoAccess } from '../config/router.config';
// import * as action from 'actions';
import createStore from '../store';

const store = createStore();

fetchIntercepter(store.dispatch);

const onEnter = (nextState, replace) => {
    // console.log('onEnter go');
    const state = store.getState();
    const loggedIn = state.userAccount && state.userAccount.loggedIn;
    // console.log('state', state);
    if (nextState) {
        // console.log('array length:', nextState.routes);
        if (nextState.routes) {
            nextState.routes.forEach((item) => {
                if ($$.isObject(item)
                    && item.config
                    && item.config.requireAuth
                    && !loggedIn) {
                    replace('/login');
                    return false;
                }
                return true;
            });
        }
    }
};

if (routes.childRoutes) {
    routes.onEnter = onEnter;
    // routes.childRoutes.forEach(item => {
    //     if (!item.onEnter) {
    //         item.onEnter = onEnter;
    //     }
    // });
}
// function addHook(item) {
//     if (!item.onEnter) {
//         item.onEnter = onEnter;
//     }
//     if (!item.childRoutes) return;
//     item.childRoutes.forEach(subItem => {
//         addHook(subItem);
//     });
// }
// addHook(routes);
export default function Root() {
    return (
        <Provider store={store}>
            <Router history={browserHistory}>
                {routes}
                {routesNoAccess}
            </Router>
        </Provider>
    );
}