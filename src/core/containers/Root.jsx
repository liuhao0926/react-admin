import fetchIntercepter from '../config/fetch.config';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { routes, routeConfig } from '../config/router.config';
import * as action from 'actions';
import createStore from '../store';

const store = createStore();
const bodyEle = document.querySelector('body');

fetchIntercepter(store.dispatch);

function animationend() {
    bodyEle.classList.remove('view-acitve');
    window.removeEventListener('animationend', animationend);
}
const onUpdate = () => {
    bodyEle.classList.add('view-acitve');
    document.querySelector('.am-navbar-right')
        .addEventListener('animationend', animationend, false);
};
const onEnter = (nextState, replace) => {
    const state = store.getState();
    const { userAccount: { loggedIn } } = state;
    bodyEle.classList.remove('view-acitve');
    if (nextState && nextState.location) {
        const currentRoutes = routeConfig.filter(item => {
            return item.pathname === nextState.location.pathname;
        });
        if (currentRoutes && currentRoutes.length) {
            const currentRoute = currentRoutes[0];
            if (currentRoute.config && currentRoute.config.requireAuth && !loggedIn) {
                return replace('/login');
            }
            store.dispatch(action.replaceNavigation(currentRoute.config));
        } else {
            store.dispatch(action.replaceNavigation({
                title: '404',
                navbarState: 'common'
            }));
        }
    }
};

if (routes.childRoutes) {
    routes.childRoutes.forEach(item => {
        if (!item.onEnter) {
            item.onEnter = onEnter;
        }
    });
}
export default function Root() {
    return (
        <Provider store={store}>
            <Router history={browserHistory} onUpdate={onUpdate}>
                {routes}
            </Router>
        </Provider>
    );
}