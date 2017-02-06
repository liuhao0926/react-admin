// import { StorageService } from '../../utils';
// import { Toast } from 'UI';
import * as types from 'actions/citys/types';

export default (state = {
    isFetching: false,
    citys: [],
    busines: []
    // selected: StorageService.get('CITY') || {}
}, action) => {
    switch (action.type) {
        case `${types.ACTION_TYPE_NAME_BY_CITY}_REQUEST`:
            return Object.assign({}, state, { isFetching: true });
            
        case `${types.ACTION_TYPE_NAME_BY_CITY}_SUCCESS`:
            return Object.assign({}, state, {
                isFetching: false,
                citys: action.data,
                receivedAt: Date.now()
            });
            
        case `${types.ACTION_TYPE_NAME_BY_BUSINESS}_REQUEST`:
            // Toast.loading('正在加载...', 300);
            return Object.assign({}, state, { isFetching: true });

        case `${types.ACTION_TYPE_NAME_BY_BUSINESS}_SUCCESS`:
            // Toast.hide();
            return Object.assign({}, state, {
                isFetching: false,
                busines: action.data
            });

        case `${types.ACTION_TYPE_NAME_BY_CITY}_FAILURE`:
        case `${types.ACTION_TYPE_NAME_BY_BUSINESS}_FAILURE`:
            // Toast.fail(action.reason.data[0], 5);
            return Object.assign({}, state, {
                isFetching: false
            });

        case types.ON_SELECT_CITY:
            // StorageService.set('CITY', action.city, 86400000 * 30);
            return Object.assign({}, state, { selected: action.city });

        default:
            return state;
    }
};