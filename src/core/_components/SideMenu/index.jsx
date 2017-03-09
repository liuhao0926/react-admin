import { Component, PropTypes } from 'react';
import { Menu, Icon } from 'UI';

class SideMenu extends Component {
    static propTypes = {
        router: PropTypes.object.isRequired
    };
    constructor() {
        super();
        this.state = {
            selectedKeys: []
        };
        this.handleOnClick = this.handleOnClick.bind(this);
    }
    componentDidMount() {
        this.__initRouteEvent();
        // this.props.router.listenBefore((obj) => {
        //     console.log('router listenBefore:', obj);
        // });
    }
    __initRouteEvent() {
        this.props.router.listen((obj) => {
            const pathname = obj.pathname;
            // const keys = [...this.state.selectedKeys];
            const keys = [];
            let key;
            if (pathname === '/') {
                key = 'home';
            } else {
                key = pathname.substr(1);
            }
            keys.push(key);
            this.setState({
                selectedKeys: keys
            });
        });
    }
    handleOnClick(item) {
        // console.log(item);
        let key = item.key;
        if (key === 'home') {
            key = '';
        }
        key = `/${key}`;
        this.props.router.push(key);
        // console.log('this.props.router', this.props.router, this.props.router.getCurrentLocation());
    }
    render() {
        return (
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}
                onClick={this.handleOnClick}
                selectedKeys={this.state.selectedKeys}
            >
                <Menu.Item key="home">
                    <Icon type="user" />
                    <span className="nav-text">首页</span>
                </Menu.Item>
                <Menu.Item key="user">
                    <Icon type="video-camera" />
                    <span className="nav-text">用户档案</span>
                </Menu.Item>
                <Menu.Item key="user/add">
                    <Icon type="upload" />
                    <span className="nav-text">档案添加</span>
                </Menu.Item>
                <Menu.SubMenu
                    key="sub1"
                    title={<span><Icon type="user" /><span className="nav-text">User</span></span>}
                >
                    <Menu.Item key="4">Tom</Menu.Item>
                    <Menu.Item key="5">Bill</Menu.Item>
                    <Menu.Item key="6">Alex</Menu.Item>
                </Menu.SubMenu>
            </Menu>
        );
    }
}

export default SideMenu;