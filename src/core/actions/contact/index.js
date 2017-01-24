import * as types from './types';

function fetchIfNeeded(state) {
    const { items, isFetching } = state.contactStore;
    if ((items && items.length) || isFetching) {
        return false;
    }
    return true;
}

export function fetchContactList() {
    return (dispatch, getState) => {
        if (fetchIfNeeded(getState())) {
            return dispatch({
                type: types.ACTION_TYPE_NAME,
                fetchConfig: {
                    uri: '/contact/latest'
                    // uri: '//localhost:9999/api/contact/latest'
                }
            }); 
        }
    };
}
