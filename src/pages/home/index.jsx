import './home.less';
import { Component } from 'react';
import { connect } from 'react-redux';
// import { WingBlank, WhiteSpace, Grid, Icon, Modal } from 'UI';
// import { bindActionCreators } from 'redux';
// import { fetchBusinessMode } from 'actions';

// import { BUSINESS_MODES } from 'config/business.config';
// import CarouselBox from 'components/CarouselBox';
// import { StorageService } from '../../utils';


class HomePage extends Component {
    constructor() {
        super();
        this.state = {};
        // this.handleSelectMode = this.handleSelectMode.bind(this);
    }
    componentDidMount() {
    }
    componentWillReceiveProps() {
    }
    
    shouldComponentUpdate() {
    }
    render() {
        return (
            <div>
                这是首页内容
            </div>
        );
    }
}

// const mapStateToProps = state => ({ cityStore: state.cityStore, userAccount: state.userAccount });
// const actions = { fetchBusinessMode };
// const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
module.exports = connect()(HomePage);