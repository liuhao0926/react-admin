// 接送机订单时间选择器类型组件
import { Component, PropTypes } from 'react';
import { Icon, DatePicker, List, Picker } from 'UI';
import moment from 'moment';
import generatePickTimes from 'utils/maker-times';
import { StorageService } from 'utils';
const { Item } = List;
export default class UseDatePicker extends Component {
    static propTypes = {
        flightNumber: PropTypes.any,
        flightTime: PropTypes.any,
        onUpdateUseTime: PropTypes.func,
        pickerDefaultValue: PropTypes.array,
        dateDefaultValue: PropTypes.string,
        pickerType: PropTypes.string
    }
    constructor() {
        super();
        this.state = {
            minDate: moment().add(2, 'hours'),
            maxDate: moment().add(1, 'months')
        };
        this.timesConfig = [];
        this.handleMinutePickerFormat = this.handleMinutePickerFormat.bind(this);
        this.handleMinutesPickerChange = this.handleMinutesPickerChange.bind(this);
        this.handleFromDateChange = this.handleFromDateChange.bind(this);
    }
    componentDidMount() {
        this.timesConfig = generatePickTimes(this.props.pickerType);
        // 送机使用单独时间配置
        if (this.props.pickerType === 'AirportSend') {
            const cachedData = StorageService.get('SearchedFlight') || {};
            if (cachedData.config && cachedData.config.minDate && cachedData.config.maxDate) {
                const { minDate, maxDate } = cachedData.config;
                this.setState({
                    minDate: moment(minDate),
                    maxDate: moment(maxDate)
                });
            }
        }
    }
    handleMinutePickerFormat(values) {
        const { dateDefaultValue } = this.props;
        const formatTime = moment(dateDefaultValue).format('HH:mm');
        if(values.length) return values.join('') + `(${formatTime})`;
    }
    // 分钟选择器
    handleMinutesPickerChange(values) {
        const { flightTime, onUpdateUseTime } = this.props;
        const calcUseTime = moment(flightTime).valueOf() + values[1];
        const useTimeFormat = moment(calcUseTime).format('YYYY-MM-DD HH:mm');
        onUpdateUseTime(useTimeFormat, values);
    }
    // 日期选择器
    handleFromDateChange(date) {
        const { onUpdateUseTime } = this.props;
        onUpdateUseTime(moment(date).format('YYYY-MM-DD HH:mm'));
    }
    renderPicker() {
        const {
            flightNumber,
            flightTime,
            pickerDefaultValue,
            dateDefaultValue,
            pickerType } = this.props;
        
        let useDateDefaultValue;
        if (dateDefaultValue) {
            useDateDefaultValue = moment(dateDefaultValue);
        }
        // 如果选中了航班号并且非送机模式 那么就使用 分钟选择器
        if (flightNumber && flightTime && pickerType !== 'AirportSend') {
            return (
                <Picker data={this.timesConfig}
                    cols={3}
                    title="上车时间"
                    extra="请选择上车时间"
                    value={pickerDefaultValue}
                    onChange={this.handleMinutesPickerChange}
                    format={(values) => this.handleMinutePickerFormat(values)}
                >
                    <Item arrow="horizontal">
                        <Icon type="clock-circle-o" />
                    </Item>
                </Picker>
            );
        } else {
            return (
                <DatePicker mode="datetime"
                    title="上车时间"
                    extra="请选择上车时间"
                    value={useDateDefaultValue}
                    minDate={this.state.minDate}
                    maxDate={this.state.maxDate}
                    onChange={this.handleFromDateChange}
                >
                    <Item arrow="horizontal">
                        <Icon type="clock-circle-o" />
                    </Item>
                </DatePicker>
            );
        }

    }
    render() {
        return <div>{this.renderPicker()}</div>;
    }
}