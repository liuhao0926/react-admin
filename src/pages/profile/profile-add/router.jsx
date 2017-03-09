// console.log(require('./index').displayName);
module.exports = {
    path: 'add',
    config: {
        title: '用户档案添加',
        requireAuth: true
    },
    name: 'Profile-Add',
    breadcrumbName: '用户信息添加',
    // getIndexRoute(location, callback) {
    //     require.ensure([], (require) => {
    //         callback(null, require('./index'));
    //     }, 'home');
    // },
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./index'));
        }, 'Profile-Add');
    }
};
