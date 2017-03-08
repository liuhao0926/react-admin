import { Component } from 'react';
import { Breadcrumb } from 'UI';

class MyBreadcrumb extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <Breadcrumb style={{ margin: '12px 16px' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
        );
    }
}

export default MyBreadcrumb;