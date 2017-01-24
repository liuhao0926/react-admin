import * as types from 'actions/contact/types';
export default (state = {}, action) => {
    switch (action.type) {
        case `${types.ACTION_TYPE_NAME}_REQUEST`:
            return Object.assign({}, state, { isFetching: true });

        case `${types.ACTION_TYPE_NAME}_SUCCESS`:
            if (!action.data.length) {
                action.data = [];
            }
            return Object.assign({}, state, { isFetching: false, items: action.data });

        case `${types.ACTION_TYPE_NAME}_FAILURE`:
            console.info(action.reason.data[0]);
            return Object.assign({}, state, { isFetching: false });    

        default:
            return state;            
    }
};