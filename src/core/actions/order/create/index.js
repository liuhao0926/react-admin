import * as types from './types';

export default function(order) {
    return (dispatch) => {
        dispatch({
            type: types.ACTION_TYPE_NAME,
            fetchConfig: {
                uri: '/order/add',
                options: {
                    method: 'POST',
                    body: JSON.stringify(order)
                }
            }
        }); 
    };
}
