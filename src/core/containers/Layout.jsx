import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Layout, Icon, Button, Modal } from 'UI';
import Breadcrumb from '../_components/Breadcrumb';
import SideMenu from '../_components/SideMenu';
import { userLogout } from 'actions';

const { Header, Sider, Content } = Layout;
class App extends Component {
    static propTypes = {
        children: PropTypes.element.isRequired,
        location: PropTypes.object.isRequired,
        router: PropTypes.object.isRequired,
        userLogout: PropTypes.func.isRequired
    }
    constructor() {
        super();
        this.state = {
            collapsed: false,
            minContentHeight: 280
            // defaultSelectedKeys: []
        };
    }
    handleToggle = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }
    componentDidMount() {
        this.resizeWindow();
        this.handleWindowResize();
        // console.log('this.props:', this.props.location);
    }
    componentWillUnmount() {
        window.onresize = null;
    }
    handleWindowResize() {
        window.onresize = this.resizeWindow.bind(this);
    }
    resizeWindow() {
        const clientHeight = document.documentElement.clientHeight;
        const contentHeight = clientHeight - 64 - 42 - 24;
        this.setState({
            minContentHeight: contentHeight
        });
    }
    handleLogout = () => {
        Modal.confirm({
            title: '确认要退出吗？',
            content: '点击确认立刻退出',
            onOk: () => {
                this.props.userLogout();
                this.props.router.push('/login');
            },
            onCancel: () => {}
        });
    }
    com
    render() {
        return (
            <Layout>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                >
                    <div className="logo" />
                    <SideMenu router={this.props.router} defaultPathname={this.props.location.pathname} />
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.handleToggle}
                        />
                        <div style={{
                            float: 'right',
                            marginRight: '20px'
                        }}
                        >
                            <Button type="primary" icon="download" onClick={this.handleLogout}>
                                退出
                            </Button>                          
                        </div>
                    </Header>
                    <Breadcrumb {...this.props} />
                    <Content style=
                        {{
                            margin: '0px 16px 24px 16px',
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
// const mapStateToProps = state => ({ userAccount: state.userAccount });
const actions = { userLogout };
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
export default connect(() => ({}), mapDispatchToProps)(App);