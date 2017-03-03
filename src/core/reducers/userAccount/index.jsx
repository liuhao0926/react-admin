import * as types from 'actions/userAccount/types';
import session from 'utils/storage';
// import Auth from 'utils/auth';
const data = session.get('userData') || {};
// console.log(data);
export default (state = data, action) => {
    switch (action.type) {
        case types.USER_LOGIN:
            // console.log('go in reducer USER_LOGIN');
            session.set('userData', { loggedIn: true, profile: action.userData });
            return Object.assign({}, state, { loggedIn: true, profile: action.userData });
            
        case types.USER_LOGOUT:
            session.remove('userData');
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