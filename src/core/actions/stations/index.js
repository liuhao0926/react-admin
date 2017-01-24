import * as types from './types';

let prevCity;
function fetchIfNeeded(curCity) {
    if (curCity.adcode !== prevCity) {
        prevCity = curCity.adcode;
        return true;
    }
    return false;
}

export function fetchStationConfig(city) {
    return (dispatch) => {
        if (fetchIfNeeded(city)) {
            dispatch({
                type: types.ACTION_TYPE_NAME,
                fetchConfig: {
                    cache: 'force-cache',
                    uri: `/station/stationinfo?type=4&adcode=${city.adcode}`
                }
            });
        }
    };
}
