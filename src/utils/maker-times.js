function generate(type, stepper) {
    const TEN_MILLI_SECONDS = 600000; // 10 分钟
    return Array.from(stepper, (item) => {
        const m = item.value;
        const v = type === 'AirportPickup' ? +(TEN_MILLI_SECONDS * m) : -(TEN_MILLI_SECONDS * m);
        let childrenLable = '小时';
        if (+item.label >= 30) {
            childrenLable = '分钟';
        }
        return {
            label: item.label,
            value: v,
            children: [
                {
                    label: childrenLable,
                    value: childrenLable
                }
            ]
        };
    });
}
export default function generatePickTimes(type) {
    const stepper = [
        { label: '30', value: 3 },
        { label: '1', value: 6 },
        { label: '1.5', value: 9 },
        { label: '2', value: 12 },
        { label: '2.5', value: 15 },
        { label: '3', value: 18 }
    ];
    let labelTxet;
    if (type === 'AirportPickup') {
        labelTxet = '航班到达后';
    } else {
        labelTxet = '航班起飞前';
    }
    return [
        {
            label: labelTxet,
            value: labelTxet,
            children: generate(type, stepper)
        }
    ];
}