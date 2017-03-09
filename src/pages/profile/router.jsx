// console.log(require('./profile-add/router'));
module.exports = {
    path: 'user',
    config: {
        title: '用户信息',
        requireAuth: true
    },
    name: 'Profile',
    breadcrumbName: '用户信息',
    // getIndexRoute(location, callback) {
    //     require.ensure([], (require) => {
    //         callback(null, require('./index'));
    //     }, 'home');
    // },
    childRoutes: [
        require('./profile-add/router')
    ],
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./index'));
        }, 'Profile');
    }
};
