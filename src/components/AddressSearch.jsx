import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { List, Radio, ActivityIndicator, WhiteSpace, Result } from 'UI';
import StorageService from '../utils/storage';
const RadioItem = Radio.RadioItem;
class AddressSearch extends Component {
    static propTypes = {
        onSelected: PropTypes.func.isRequired,
        cityStore: PropTypes.object.isRequired,
    }
    constructor() {
        super();
        this.state = {};
        const apiKey = 'key=04381d8a3696251f4b3f0f77f2ad47e5';
        this.searchApi = `//restapi.amap.com/v3/place/text?${apiKey}`;
        this.debounce = null;
        this.callSearch = this.callSearch.bind(this);
        this.handleKeywordOnChange = this.handleKeywordOnChange.bind(this);
        this.handlePlaceOnSelect = this.handlePlaceOnSelect.bind(this);
    }
    componentDidMount() {
        this.debounce = require('../utils/debounce').default(this.callSearch, 1000);
        const { selected: { city_name: cityName } } = this.props.cityStore;
        this.cityName = cityName;
        const { top: boxOffsetTop } = this.listWraper.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const boxHeight = (windowHeight - boxOffsetTop);
        this.listWraper.setAttribute('style', `height: ${boxHeight}px`);
        const cachedPois = StorageService.get('SearchedPois');
        if (cachedPois) {
            this.setState({ ...cachedPois });
        } else {
            this.callSearch(cityName);
        } 
    }
    componentWillUnmount() {
        this.debounce.clear();
    }
    handleKeywordOnChange(event) {
        const keywords = event.target.value;
        if (keywords.trim().length) {
            this.callSearch(keywords);
        }
    }
    callSearch(value) {
        const searchOpts = {
            children: 0,
            offset: 20,
            page: 1,
            citylimit: true,
            extensions: 'base',
            city: this.cityName,
            keywords: encodeURIComponent(value)
        };
        const makeAnQueryParmas = Object.keys(searchOpts)
            .map(key => (`${key}=${searchOpts[key]}`))
            .join('&');
        this.setState({ isFetching: true });
        return fetch(`${this.searchApi}&${makeAnQueryParmas}`)
            .then(response => {
                if (response.info === 'OK') {
                    const { pois } = response;
                    this.setState({ pois, isFetching: false });
                }
            })
            .catch(err => {
                console.info(err);
                this.setState({ isFetching: false });
            });
    }
    handlePlaceOnSelect(poi) {
        const { name: address, location } = poi;
        const [longitude, latitude] = location.split(',');
        this.setState({
            selectedId: poi.id
        }, () => {
            StorageService.set('SearchedPois', this.state);
            this.props.onSelected({
                latitude,
                longitude,
                address
            });
        });    
    }
    renderSearchBox() {
        const { selected: { city_name: cityName } } = this.props.cityStore;
        return (
            <div className="map-search-box">
                <span className="city">{cityName}</span>
                <input type="text"
                    onChange={this.handleKeywordOnChange}
                    className="input"
                    placeholder="您要去哪儿"
                />
            </div>
        );
    }
    renderList() {
        const { pois, isFetching } = this.state;
        let list;
        if (isFetching) {
            list = (
                <div>
                    <WhiteSpace size="lg" />
                    <WhiteSpace size="lg" />
                    <WhiteSpace size="lg" />
                    <WhiteSpace size="lg" />
                    <WhiteSpace size="lg" />
                    <WhiteSpace size="lg" />
                    <ActivityIndicator
                        animating={isFetching}
                        className="align-center"
                        size="large"
                        text="玩命加载中..."
                    />
                </div>
            );
        }
        if (pois && pois.length > 0 && !isFetching) {
            list = (
                <List>
                    {pois.map((poi, key) => (
                        <RadioItem
                            key={key}
                            checked={poi.id === this.state.selectedId}
                            onClick={() => this.handlePlaceOnSelect(poi)}
                            multipleLine
                        >{poi.name}
                            <List.Item.Brief>{poi.adname}{poi.address}</List.Item.Brief>    
                        </RadioItem>
                    ))}
                </List>
            );
        }
        if (pois && pois.length === 0 && !isFetching) {
            list = (
                <Result
                    imgUrl="https://zos.alipayobjects.com/rmsportal/NRzOqylcxEstLGf.png"
                    message="未查询到相关地址"
                />
            );
        }        
        return list;
    }
    render() {
        return (
            <div>
                {this.renderSearchBox()}
                <div className="pois-list-wraper"
                    ref={(box) => {this.listWraper = box;}}
                >
                    {this.renderList()}
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    cityStore: state.cityStore
});

module.exports = connect(mapStateToProps)(AddressSearch);