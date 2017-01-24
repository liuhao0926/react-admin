import Layout from '../containers/Layout';

const childRoutes = [];
const routeConfig = [];
const rawRouters = [
    'home'
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

    }
});
const routes = {
    component: Layout,
    childRoutes
};

export { routes, routeConfig };



