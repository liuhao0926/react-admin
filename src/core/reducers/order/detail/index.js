import * as types from 'actions/order/detail/types';
import { Toast } from 'UI';

export default (state = { isFetching: false, data: {} }, action) => {
    switch (action.type) {
        case `${types.ACTION_TYPE_NAME}_REQUEST`:
            return Object.assign({}, state, { isFetching: true });

        case `${types.ACTION_TYPE_NAME}_SUCCESS`:
            return Object.assign({}, state, {
                isFetching: false,
                data: action.data,
                receivedAt: Date.now()
            });

        case `${types.ACTION_TYPE_NAME}_FAILURE`:
            Toast.fail(action.reason.data[0], 5);
            return Object.assign({}, state, {
                isFetching: false
            });  

        default:
            return state;            
    }
};