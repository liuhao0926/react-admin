import * as types from 'actions/order/price-detail/types';

export default (state = { isFetching: false }, action) => {
    switch (action.type) {
        case `${types.ACTION_TYPE_NAME}_REQUEST`:
            return { isFetching: true };

        case `${types.ACTION_TYPE_NAME}_SUCCESS`:
            return Object.assign({}, state, {
                isFetching: false,
                orderState: 'success',
                data: action.data
            });

        case `${types.ACTION_TYPE_NAME}_FAILURE`:
            return {
                isFetching: false,
                reason: action.reason.data[0],
                orderState: 'fail'
            };    

        default:
            return state;            
    }
};