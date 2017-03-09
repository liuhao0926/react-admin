import { Component } from 'react';
import { connect } from 'react-redux';
// import { WingBlank, WhiteSpace, Grid, Icon, Modal } from 'UI';
// import { bindActionCreators } from 'redux';
// import { fetchBusinessMode } from 'actions';

// import { BUSINESS_MODES } from 'config/business.config';
// import CarouselBox from 'components/CarouselBox';
// import { StorageService } from '../../utils';


class ProfileAddPage extends Component {
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
            <div style={{ marginLeft: 30 }}>
                这是用户档案[添加]页面
            </div>
        );
    }
}

// const mapStateToProps = state => ({ cityStore: state.cityStore, userAccount: state.userAccount });
// const actions = { fetchBusinessMode };
// const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
module.exports = connect()(ProfileAddPage);