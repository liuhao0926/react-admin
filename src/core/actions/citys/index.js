import * as types from './types';

// 请求城市列表数据
function fetchCityListIfNeeded(state) {
    const { citys, isFetching } = state.cityStore;
    if (!citys.length || !isFetching) {
        return true;
    }
}

// 请求城市列表
export function fetchCityList() {
    return (dispatch, getState) => {
        if (fetchCityListIfNeeded(getState())) {
            return dispatch({
                type: types.ACTION_TYPE_NAME_BY_CITY,
                fetchConfig: {
                    uri: '/business/opencity'
                }
            });
        }
    };
}

// 请求城市服务列表

export function fetchBusinessMode(city) {
    return (dispatch) => {
        return dispatch({
            type: types.ACTION_TYPE_NAME_BY_BUSINESS,
            fetchConfig: {
                uri: `/business/open?adcode=${city.adcode}`
            }
        });
    };
}


// 选择城市
export function selectedCity(city) {
    return dispatch => dispatch({
        type: types.ON_SELECT_CITY,
        city
    });
}




