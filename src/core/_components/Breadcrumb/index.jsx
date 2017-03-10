import { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Breadcrumb } from 'UI';

function itemRender(route, params, routes, paths) {
    // const last = routes.indexOf(route) === routes.length - 1;
    let last = false;
    if ((routes.indexOf(route) === routes.length - 1)
        || (route.path === '/' && typeof routes[routes.length-1] === 'function')) {
        last = true;
    }
    // console.log('paths:', paths);
    // console.log('routes:', routes);
    // console.log('route:', route);
    // console.log('last:', last);
    return last ? <span>{route.breadcrumbName}</span> : <Link to={paths.length ? paths.join('/') : '/'}>
        {route.breadcrumbName}
    </Link>;
}

class MyBreadcrumb extends Component {
    static propTypes = {
        routes: PropTypes.array,
        params: PropTypes.object
    }
    constructor() {
        super();
    }
    render() {
        return (
            <Breadcrumb style={{ margin: '12px 16px' }} routes={this.props.routes} params={this.props.params}
                itemRender={itemRender}
            />
        );
    }
}

export default MyBreadcrumb;