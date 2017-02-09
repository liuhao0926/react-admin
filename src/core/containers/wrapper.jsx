import { Component, PropTypes } from 'react';
// import { Layout, Menu, Icon } from 'UI';

// const { Header, Sider, Content } = Layout;
class Wrapper extends Component {
    static propTypes = {
        children: PropTypes.element.isRequired,
        location: PropTypes.object.isRequired,
        router: PropTypes.object.isRequired
    }
    constructor() {
        super();
        this.state = {};
        // this.handleToggle = this.handleToggle.bind(this);
    }
    // handleToggle() {
    //     this.setState({
    //         collapsed: !this.state.collapsed
    //     });
    // }
    // componentDidMount() {
    //     this.resizeWindow();
    //     this.handleWindowResize();
    // }
    // handleWindowResize() {
    //     window.onresize = this.resizeWindow.bind(this);
    // }
    // resizeWindow() {
    //     const clientHeight = document.documentElement.clientHeight;
    //     const contentHeight = clientHeight - 64 - 48;
    //     this.setState({
    //         minContentHeight: contentHeight
    //     });
    // }
    render() {
        return (
            <div className="wrapper">
                {this.props.children}
            </div>
        );
    }
}
export default Wrapper;