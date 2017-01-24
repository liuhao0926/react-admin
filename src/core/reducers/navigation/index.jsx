import * as types from 'actions/navigation/types';

export default (state = {}, action) => {
    switch (action.type) {
        case types.REPLACE_NAVIGATION:
            return Object.assign({}, state, action.config);         
        default:
            return state;
    }
};