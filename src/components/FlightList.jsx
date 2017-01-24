import { PropTypes } from 'react';
import { List, Radio, Result, ActivityIndicator, WhiteSpace } from 'UI';
const FlightList = (props) => {
    const { flights, onSelect, value, isEmptyList, ajaxBusy } = props;
    const { RadioItem } = Radio;
    let list;
    if (flights && flights.length) {
        list = (
            <List>
                {
                    flights.map((flight, key) => (
                        <RadioItem key={key}
                            checked={value === key}
                            onChange={(event) => {
                                event.stopPropagation();
                                onSelect(key);
                            }}
                            multipleLine
                        >
                            {flight.dep_city}- {flight.arr_city}
                            <List.Item.Brief>{flight.start_time}- {flight.end_time}</List.Item.Brief>
                        </RadioItem>
                    ))
                }
            </List>
        );
    }
    if (ajaxBusy) {
        list = (
            <div>
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                <ActivityIndicator
                    animating={ajaxBusy}
                    className="align-center"
                    size="large"
                    text="玩命加载中..."
                />
            </div>
        );
    }
    if (isEmptyList && !ajaxBusy) {
        list = (
            <Result
                imgUrl="https://zos.alipayobjects.com/rmsportal/NRzOqylcxEstLGf.png"
                message="未查询到相关航班信息"
            />
        );
    }
    return (
        <div>{list}</div>
    );
};
FlightList.propTypes = {
    onSelect: PropTypes.func.isRequired,
    flights: PropTypes.array.isRequired,
    value: PropTypes.any.isRequired,
    isEmptyList: PropTypes.bool.isRequired,
    ajaxBusy: PropTypes.bool
};
export default FlightList;