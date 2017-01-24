import './home.less';
import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { WingBlank, WhiteSpace, Grid, Icon, Modal } from 'UI';
import { bindActionCreators } from 'redux';
import { fetchBusinessMode } from 'actions';

import { BUSINESS_MODES } from 'config/business.config';
import CarouselBox from 'components/CarouselBox';
import { StorageService } from '../../utils';


class HomePage extends Component {
    static propTypes = {
        cityStore: PropTypes.object.isRequired,
        router: PropTypes.object.isRequired,
        fetchBusinessMode: PropTypes.func.isRequired
    }
    constructor() {
        super();
        this.state = {};
        this.handleSelectMode = this.handleSelectMode.bind(this);
    }
    componentDidMount() {
        StorageService.remove('SearchedFlight');
        StorageService.remove('SearchedPois');
        StorageService.remove('SelectedContact');
        StorageService.remove('ORDER_DATA');
        if ($$.isWeChatBrowser()) {
            const weChatUser = StorageService.get('WECHAT_USER');
            if (!weChatUser || !weChatUser.openid) {
                window.location.href = `${document.location.origin}/openid.html`;
            }
        }
    }
    componentWillReceiveProps(nextProps) {
        if (!this.state.selectedCity || 
            (nextProps.cityStore.selected.adcode !== this.state.selectedCity.adcode)) {
            this.setState({ selectedCity: nextProps.cityStore.selected });
            this.props.fetchBusinessMode(nextProps.cityStore.selected);
        }   
    }
    
    shouldComponentUpdate(nextProps) {
        const { cityStore: { selected: nextCity } } = nextProps;
        const { cityStore: { selected: prevCity } } = this.props;
        if (nextCity.adcode !== prevCity.adcode) {
            console.info('City has change to %s %s', nextCity.adcode, nextCity.city_name);
            return true;
        }
        return false;
    }
    render() {
        return (
            <div>
                这是首页内容
            </div>
        );
    }
}

const mapStateToProps = state => ({ cityStore: state.cityStore, userAccount: state.userAccount });
const actions = { fetchBusinessMode };
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
module.exports = connect(mapStateToProps, mapDispatchToProps)(HomePage);