import * as types from 'actions/travels/types';
export default (state = {
    isFetching: false,
    items: []
}, action) => {
    switch (action.type) {
        case `${types.ACTION_TYPE_NAME}_REQUEST`:
            return Object.assign({}, state, { isFetching: true });

        case `${types.ACTION_TYPE_NAME}_SUCCESS`:
            return Object.assign({}, state, {
                isFetching: false,
                isLastRequest: action.data.length === 0,
                items: [...state.items, ...action.data]
            });

        case `${types.ACTION_TYPE_NAME}_FAILURE`:
            return Object.assign({}, state, {
                isFetching: false
            });
            
        case 'REFRESH_TRAVELS':
            return Object.assign({}, state, {
                isFetching: false,
                items: [...action.data]
            });

        default:
            return state;
    }
};