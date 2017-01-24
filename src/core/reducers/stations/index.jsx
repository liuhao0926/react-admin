import { Toast } from 'UI';
import * as types from 'actions/stations/types';


export default (state = {
    isFetching: false,
    station: {}
}, action) => {
    switch (action.type) {
        case `${types.ACTION_TYPE_NAME}_REQUEST`:
            Toast.loading('正在加载...', 300);
            return Object.assign({}, state, { isFetching: true });   
            
        case `${types.ACTION_TYPE_NAME}_SUCCESS`:
            Toast.hide();
            return Object.assign({}, state, {
                isFetching: false,
                station: action.data
            });  
            
        case `${types.ACTION_TYPE_NAME}_FAILURE`:
            console.info('请求站点信息失败', action.reason);
            Toast.fail(action.reason.data[0], 5);
            return Object.assign({}, state, {
                isFetching: false
            });  
        default:
            return state;
    }
};