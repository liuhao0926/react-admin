import { Component, PropTypes } from 'react';
import { Layout, Menu, Icon } from 'UI';

const { Header, Sider, Content } = Layout;
class App extends Component {
    static propTypes = {
        children: PropTypes.element.isRequired,
        location: PropTypes.object.isRequired,
        router: PropTypes.object.isRequired
    }
    constructor() {
        super();
        this.state = {
            collapsed: false,
            minContentHeight: 280
        };
        this.handleToggle = this.handleToggle.bind(this);
    }
    handleToggle() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }
    componentDidMount() {
        this.resizeWindow();
        this.handleWindowResize();
    }
    handleWindowResize() {
        window.onresize = this.resizeWindow.bind(this);
    }
    resizeWindow() {
        const clientHeight = document.documentElement.clientHeight;
        const contentHeight = clientHeight - 64 - 48;
        this.setState({
            minContentHeight: contentHeight
        });
    }
    render() {
        return (
            <Layout>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                >
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <Icon type="user" />
                            <span className="nav-text">nav 1</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="video-camera" />
                            <span className="nav-text">nav 2</span>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="upload" />
                            <span className="nav-text">nav 3</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.handleToggle}
                        />
                    </Header>
                    <Content style=
                        {{
                            margin: '24px 16px',
                            padding: 24,
                            background: '#fff',
                            minHeight: this.state.minContentHeight
                        }}
                    >
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>
        );
    }
}
export default App;