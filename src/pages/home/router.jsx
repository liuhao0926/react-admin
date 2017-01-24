module.exports = {
    path: '/',
    config: {
        title: '首页',
        navbarState: 'home'
    },    
    getIndexRoute(location, callback) {
        require.ensure([], (require) => {
            callback(null, require('./index'));
        }, 'home');
    },
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./index'));
        }, 'home');
    }
};
