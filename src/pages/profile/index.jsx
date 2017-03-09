import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// import { WingBlank, WhiteSpace, Grid, Icon, Modal } from 'UI';
// import { bindActionCreators } from 'redux';
// import { fetchBusinessMode } from 'actions';

// import { BUSINESS_MODES } from 'config/business.config';
// import CarouselBox from 'components/CarouselBox';
// import { StorageService } from '../../utils';


class ProfilePage extends Component {
    static propTypes = {
        children: PropTypes.element
    };
    constructor() {
        super();
        this.state = {};
        // this.handleSelectMode = this.handleSelectMode.bind(this);
    }
    componentDidMount() {
    }
    componentWillReceiveProps() {
    }
    
    // shouldComponentUpdate() {
    // }
    render() {
        return (
            <div>
                这是用户档案页面
                <div style={{ marginTop: 30 }}>{this.props.children}</div>
            </div>
        );
    }
}

// const mapStateToProps = state => ({ cityStore: state.cityStore, userAccount: state.userAccount });
// const actions = { fetchBusinessMode };
// const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
module.exports = connect()(ProfilePage);