const menuData = [
    {
        key: 'home',
        iconType: 'user',
        title: '首页'
    },
    {
        key: 'user',
        iconType: 'video-camera',
        title: '用户档案'
    },
    {
        key: 'user/add',
        iconType: 'upload',
        title: '档案添加'
    },
    {
        key: 'sub1',
        iconType: 'user',
        title: 'user',
        children: [
            {
                key: '4',
                title: 'Tom'
            },
            {
                key: '5',
                title: 'Bill'
            },
            {
                key: '6',
                title: 'Alex'
            }
        ]
    }
];

export default menuData;
