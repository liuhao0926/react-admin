const orderStatus = {
    PendingDispatch: {
        k: 2,
        v: '等待派车',
        action: 'cancelOrder'
    },
    QueuingDispatch: {
        k: 3,
        v: '预约排队',
        action: 'cancelOrder'
    },
    Dispatched: {
        k: 4,
        v: '预约成功',
        action: 'cancelOrder'
    },
    Transporting: {
        k: 5,
        v: '接送中',
        tips: '正前往目的地中',
    },
    Completed: {
        k: 7,
        v: '已完成',
        action: 'goComment'
    },
    Evaluated: {
        k: 8,
        v: '评价已完成'
    },
    Waiting: {
        k: 9,
        v: '等待上车',
        tips: '稍后，司机正在赶来'
    },
    PendingPay: {
        k: 10,
        v: '等待支付'
    },
    Refunding: {
        k: 11,
        v: '已取消',
        tips: '您的退款申请已被受理'
    },
    Refunded: {
        k: 12,
        v: '已取消',
        tips: '退款已返还至您的微信账户余额。'
    },
    RefundApplying: {
        k: 13,
        v: '已取消',
        tips: '您的退款正在申请中',
    },
    DispatchFail: {
        k: 98,
        v: '预约失败',
        action: 'cancelOrder'
    }
};
module.exports = orderStatus;