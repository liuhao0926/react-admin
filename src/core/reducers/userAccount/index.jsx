import * as types from 'actions/userAccount/types';
import Auth from 'utils/auth';
export default (state = {
    loggedIn: Auth.loggedIn(),
    profile: Auth.getProfile() || {},
}, action) => {
    switch (action.type) {
        case types.USER_LOGIN:
            return Object.assign({}, state, { loggedIn: true, profile: action.userData });
            
        case types.USER_LOGOUT:
            return Object.assign({}, state, { loggedIn: false, profile: {} });  

        case `${types.REFRESH_TOKEN}_START`:
            return Object.assign({}, state);  
        
        case `${types.REFRESH_TOKEN}_SUCCESS`:
            console.info('刷新TOKEN成功');
            return Object.assign({}, state, {
                loggedIn: true,
                profile: Object.assign({}, state.profile, action.userData)
            });
            
        case `${types.REFRESH_TOKEN}_FAILURE`:
            return Object.assign({}, state, { loggedIn: false, profile: {} });  
            
        default:
            return state;
    }
};