import * as types from './types';

function checkState(state, config) {
    if (!$$.equals(state.navigationState, config)) return true;
    return false;
}
export function replaceNavigation(config) {
    return (dispatch, getState) => {
        if (checkState(getState(), config)) {
            dispatch({ type: types.REPLACE_NAVIGATION, config });
        }
    };
}
