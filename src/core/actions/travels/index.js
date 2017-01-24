import * as types from './types';

// 请求行程列表
export function fetchTravels({ page, rows }) {
    return (dispatch, state) => {
        const { travelsStore } = state();
        if (travelsStore.isFetching) return;
        return dispatch({
            type: types.ACTION_TYPE_NAME,
            fetchConfig: {
                uri: `/order/list?page=${page}&rows=${rows}`
            }
        });
    };
}

export function refreshTravels(items) {
    return (dispatch) => {
        dispatch({
            type: 'REFRESH_TRAVELS',
            data: items
        });
    };
}