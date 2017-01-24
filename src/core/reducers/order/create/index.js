import * as types from 'actions/order/create/types';
import { Toast } from 'UI';
const mockData = {
    // orderStatus: 'success',
    // data: {
    //     basics_price: 2000,
    //     bill_detail: null,
    //     create_time: '2016-12-09 17:52:53',
    //     default_coupon: null,
    //     is_success: true,
    //     need_pay_price: 1100,
    //     order_id: '1289927204341993602',
    //     people_number: 1,
    //     total_price: 1100,
    //     unit_price: 1100
    // }
};

export default (state = { isFetching: false, ...mockData }, action) => {
    switch (action.type) {
        case `${types.ACTION_TYPE_NAME}_REQUEST`:
            return { isFetching: true };

        case `${types.ACTION_TYPE_NAME}_SUCCESS`:
            return Object.assign({}, state, {
                isFetching: false,
                data: action.data,
                orderStatus: 'success'
            });

        case `${types.ACTION_TYPE_NAME}_FAILURE`:
            Toast.fail(action.reason.data[0], 5);
            return {
                isFetching: false,
                orderStatus: 'failure'
            };    

        default:
            return state;            
    }
};