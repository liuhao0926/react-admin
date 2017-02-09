module.exports = {
    path: '/login',
    config: {
        title: '登陆',
        navbarState: 'login',
        requireAuth: false
    },    
    // getIndexRoute(location, callback) {
    //     require.ensure([], (require) => {
    //         callback(null, require('./index'));
    //     }, 'login');
    // },
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./index'));
        }, 'login');
    }
};
