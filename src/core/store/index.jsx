import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducers from '../reducers';
import dispatchMiddleware from '../config/dispatch.middleware';

const middlewares = [thunkMiddleware, dispatchMiddleware()];
if (__MOCK__) {
    const createLogger = require('redux-logger');
    const loggerMiddleware = createLogger();
    middlewares.push(loggerMiddleware);
}

export default initialState => createStore(
    rootReducers, 
    initialState,
    compose(
        applyMiddleware(...middlewares),
        window.devToolsExtension ? window.devToolsExtension() : fn => fn
    )
);