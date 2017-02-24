import * as types from './types';

export function userLogin(userData) {
    // return { type: types.USER_LOGIN, userData };
    return dispatch => dispatch({
        type: types.USER_LOGIN,
        userData
    });
}

export function userLogout() {
    return { type: types.USER_LOGOUT };
}
