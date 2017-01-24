import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchStationConfig } from 'actions';
import { Picker, Icon, List } from 'UI';

const { Item } = List;
class StationPicker extends Component {
    static propTypes = {
        cityStore: PropTypes.object.isRequired,
        stationStore: PropTypes.object.isRequired,
        value: PropTypes.array,
        stationType: PropTypes.string,
        title: PropTypes.string,
        addressType: PropTypes.string,
        onSelected: PropTypes.func.isRequired,
        fetchStationConfig: PropTypes.func.isRequired
    }
    constructor() {
        super();
        this.state = {};
        this.handleStationChange = this.handleStationChange.bind(this);
    }
    componentDidMount() {
        const { cityStore: { selected: city } } = this.props;
        if (city.adcode) {
            this.props.fetchStationConfig(city);
            this.updateStations(this.props);
        }
    }
    componentWillReceiveProps(nextProps) {
        // 预处理选择器的数据格式
        if (!$$.equals(nextProps.stationStore.station, this.state.stations)) {
            this.updateStations(nextProps);
        }
    }
    updateStations(props) {
        const {
            stationStore: { station },
            stationType
        } = props;   
        if (!station || !station[stationType]) return;
        station[stationType].map(item => {
            item.label = item.name;
            item.value = item.id;
        });
        this.setState({ stations: station[stationType] });        
    }
    // 航站楼更改的回调事件
    handleStationChange(selectedStationId) {
        const findStation = this.state.stations.find(fruit => fruit.id === selectedStationId[0]);
        const stationData = {
            station_id: findStation.station_id
        };
        // 根据订单类型来设置起或终点坐标
        const { addressType } = this.props;
        switch (addressType) {
            case 'AirportPickup': /*eslint no-case-declarations: 0*/
            case 'TrainPickup': 
            case 'BusPickup': 
                const { name: start_place,
                    latitude: s_latitude,
                    longitude: s_longitude } = findStation;
                Object.assign(stationData, { start_place, s_latitude, s_longitude });
                break;
            case 'AirportSend': /*eslint no-case-declarations: 0*/
            case 'TrainSend': 
            case 'BusSend': 
                const { name: end_place,
                    latitude: d_latitude,
                    longitude: d_longitude } = findStation;
                Object.assign(stationData, { end_place, d_latitude, d_longitude });
                break;    
        }
        this.props.onSelected(stationData, selectedStationId);
    }
    render() {
        const { title } = this.props;
        return (
            <Picker data={this.state.stations}
                cols={1}
                title={title}
                extra={`请选择${title}`}
                value={this.props.value}
                onChange={this.handleStationChange}
            >
                <Item arrow="horizontal">
                    <Icon type="environment-o" />
                </Item>
            </Picker>
        );
    }
}

const mapStateToProps = state => ({
    cityStore: state.cityStore,
    stationStore: state.stationStore
});
const actions = { fetchStationConfig };
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
module.exports = connect(mapStateToProps, mapDispatchToProps)(StationPicker);