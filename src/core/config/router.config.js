import Layout from '../containers/Layout';
import Wrapper from '../containers/Wrapper';

const childRoutes = [];
const childRoutesAccess = [];
const childRoutesNoAccess = [];
const routeConfig = [];
const rawRouters = [
    'home',
    'login'
];

function handlerRouter(route) {
    childRoutes.push(require(`pages/${route}/router`));
}
rawRouters.map(handlerRouter);

childRoutes.forEach(route => {
    if (route && route.config) {
        routeConfig.push(
            {
                pathname: route.path,
                config: route.config
            }
        );
        if (route.childRoutes) {
            route.childRoutes.forEach(subRoute => {
                routeConfig.push(
                    {
                        pathname: `${route.path}/${subRoute.path}`,
                        config: Object.assign({}, route.config, subRoute.config)
                    }
                );
            });
        }
        if (route.config.requireAuth) {
            childRoutesAccess.push(route);
        } else {
            childRoutesNoAccess.push(route);
        }

    }
});
const routes = {
    component: Layout,
    childRoutes: childRoutesAccess
};
const routesNoAccess = {
    component: Wrapper,
    childRoutes: childRoutesNoAccess
};

export { routes, routesNoAccess, routeConfig };



