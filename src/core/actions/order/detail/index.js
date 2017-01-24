import * as types from './types';

function paramsRequired() {
    throw Error('Order Id Is Required');
}

export default function(id = paramsRequired()) {
    return (dispatch) => {
        dispatch({
            type: types.ACTION_TYPE_NAME,
            fetchConfig: {
                uri: `/order/detail?id=${id}`
            }
        }); 
    };
}
