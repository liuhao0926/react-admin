import { Component, PropTypes } from 'react';
import { Menu, Icon } from 'UI';
import menuData from './data';

class SideMenu extends Component {
    static propTypes = {
        router: PropTypes.object.isRequired,
        defaultPathname: PropTypes.string
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
        this.__initDefaultMenuItem();
    }
    __initRouteEvent() {
        this.props.router.listen((obj) => {
            const pathname = obj.pathname;
            const keys = [];
            let key;
            if (pathname === '/') {
                key = 'home';
            } else if(pathname.indexOf('/') === 0) {
                key = pathname.substr(1);
            } else {
                key = pathname;
            }
            keys.push(key);
            this.setState({
                selectedKeys: keys
            });
        });
    }
    __initDefaultMenuItem() {
        const keys = [];
        let key = this.props.defaultPathname.substr(1) || 'home';
        keys.push(key);
        this.setState({
            selectedKeys: keys
        });
    }
    handleOnClick(item) {
        let key = item.key;
        if (key === 'home') {
            key = '';
        }
        key = `/${key}`;
        this.props.router.push(key);
    }
    __renderMenuItems(data) {
        let items = [];
        data.forEach((obj) => {
            if (!obj.children) {
                items.push(this.__renderMenuItem(obj));
                return;
            }
            items.push(
                <Menu.SubMenu
                    key={obj.key}
                    title={<span><Icon type={obj.iconType} /><span className="nav-text">{obj.title}</span></span>}
                >
                    {this.__renderMenuItems(obj.children)}
                </Menu.SubMenu>
            );
        });
        return items;
    }
    __renderMenuItem(obj) {
        if (obj.iconType) {
            return (
                <Menu.Item key={obj.key}>
                    <Icon type={obj.iconType} />
                    <span className="nav-text">{obj.title}</span>
                </Menu.Item>
            );
        }
        return (
            <Menu.Item key={obj.key}>{obj.title}</Menu.Item>
        );
    }
    /**
     *                 <Menu.Item key="home">
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
     */
    render() {
        return (
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['home']}
                onClick={this.handleOnClick}
                selectedKeys={this.state.selectedKeys}
            >
                {this.__renderMenuItems(menuData)}
            </Menu>
        );
    }
}

export default SideMenu;