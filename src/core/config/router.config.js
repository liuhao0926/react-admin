import Layout from '../containers/Layout';
import Wrapper from '../containers/Wrapper';
// console.log('__PAGES__:', __PAGES__);
const childRoutes = [];
const childRoutesAccess = [];
const childRoutesNoAccess = [];
const routeConfig = [];
const rawRouters = __PAGES__; // eslint-disable-line

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
    path: '/',
    component: Layout,
    childRoutes: childRoutesAccess,
    config: {
        requireAuth: true
    },
    name: 'Home',
    breadcrumbName: '首页'
};
const routesNoAccess = {
    component: Wrapper,
    childRoutes: childRoutesNoAccess
};

export { routes, routesNoAccess, routeConfig };



