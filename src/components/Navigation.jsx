import { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchCityList, selectedCity } from 'actions';
import { Icon, NavBar, Radio, List, Popup, ActivityIndicator, WhiteSpace } from 'UI';
import setTitle from '../utils/set-title';

class Navigation extends Component {
    static propTypes = {
        navigationState: PropTypes.object.isRequired,
        userAccount: PropTypes.object.isRequired,
        cityStore: PropTypes.object.isRequired,
        selectedCity: PropTypes.func.isRequired,
        fetchCityList: PropTypes.func.isRequired,
        router: PropTypes.object.isRequired
    }
    constructor(props) {
        super(props);
        this.state = {
            navigationState: {}
        };    
        this.handleShowCityPopup = this.handleShowCityPopup.bind(this);
        this.handleOnSelectCity = this.handleOnSelectCity.bind(this);
        this.handleGoHome = this.handleGoHome.bind(this);
    }
    componentDidMount() {
        this.props.fetchCityList();
    }
    componentWillReceiveProps(nextProps) {
        const nextState = nextProps.navigationState;
        if (nextState.title !== this.state.title) {
            this.setState({ navigationState: nextProps.navigationState }, () => {
                if ($$.isWeChatBrowser()) {
                    const timer = window.setTimeout(() => {
                        if (nextState.title !== '创建行程'
                            && (nextState.title !== document.title)) {
                            setTitle(nextState.title);
                        }
                        window.clearTimeout(timer);
                    }, 300);
                }
            });
        }
    }
    handleOnSelectCity(city) {
        this.props.selectedCity(city);
        Popup.hide();
    }
    renderCitys(citys, position) {
        const RadioItem = Radio.RadioItem;
        return (
            citys.map((city, key) => (
                <RadioItem key={key}
                    checked={position.adcode === city.adcode}
                    onChange={(event) => {
                        event.stopPropagation();
                        this.handleOnSelectCity(city);
                    }}
                >
                    {city.city_name}
                </RadioItem>
            ))
        );
    }
    cityPopup() {
        const { cityStore: { citys, selected: position, isFetching } } = this.props;
        let list = (
            <div>
                <WhiteSpace size="lg" />    
                <WhiteSpace size="lg" />    
                <ActivityIndicator
                    animating={isFetching}
                    className="align-center"
                    size="small"
                />
                <WhiteSpace size="lg" />  
                <WhiteSpace size="lg" />  
            </div>
        );
        if (!isFetching && citys && citys.length) {
            list = this.renderCitys(citys, position);
        }
        return (
            <div>
                <List renderHeader={() => '选择城市'}>
                    {list}
                </List>
            </div>
        );
    }
    handleShowCityPopup() {
        Popup.show(this.cityPopup(), { animationType: 'slide-up' });
    }
    handleGoHome() {
        this.props.router.push({
            pathname: '/',
            state: {
                transition: 'goBack'
            }
        }); 
    }
    handleGoUserCenter() {
        this.props.router.push({
            pathname: '/u'
        }); 
    }
    handleGoBack() {
        this.props.router.goBack(); 
    }
    renderNavbar() {
        const { cityStore: { selected: position } } = this.props;
        const { navigationState: { title, navbarState } } = this.state;
        const navBarStyles = {
            home: {
                iconName: 'user',
                leftContent: '',
                rightContent: [
                    <span className="navbar-city"
                        key={0}
                        onClick={this.handleShowCityPopup}
                    >
                        {position.city_name || '请选择城市'}
                    </span>,
                    <Icon type="right" key={1} />
                ],
                onLeftClick: () => this.handleGoUserCenter()
            },
            common: {
                onLeftClick: () => this.handleGoHome()
            },
            goBack: {
                onLeftClick: () => this.handleGoBack()
            }
        };
        return (
            <NavBar mode="dark" {...navBarStyles[navbarState || 'common']}>
                {title || '飞牛巴士'}
            </NavBar>
        );
    }
    render() {
        return (
            <header className="app-header">
                {this.renderNavbar()}
            </header>
        );
    }
}
const mapStateToProps = state => ({
    cityStore: state.cityStore,
    userAccount: state.userAccount,
    navigationState: state.navigationState
});

const actions = { fetchCityList, selectedCity };
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
module.exports = connect(mapStateToProps, mapDispatchToProps)(Navigation);


