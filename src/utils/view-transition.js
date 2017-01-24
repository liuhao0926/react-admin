import spring from 'react-motion/lib/spring';
const fadeConfig = { stiffness: 200, damping: 22 };
const slideConfig = { stiffness: 330, damping: 30 };
export default {
    inRight: {
        atEnter: {
            opacity: 0,
            offset: 100
        },
        atLeave: {
            opacity: spring(0, fadeConfig),
            offset: spring(-100, slideConfig)
        },
        atActive: {
            opacity: spring(1, slideConfig),
            offset: spring(0, slideConfig)
        },
        mapStyles(styles) {
            return {
                opacity: styles.opacity,
                transform: `translate3d(${styles.offset}%, 0, 0)`
            };
        }
    },
    outRight: {
        atEnter: {
            opacity: 0,
            offset: -100
        },
        atLeave: {
            opacity: spring(0, fadeConfig),
            offset: spring(100, slideConfig)
        },
        atActive: {
            opacity: spring(1, slideConfig),
            offset: spring(0, slideConfig)
        },
        mapStyles(styles) {
            return {
                opacity: styles.opacity,
                transform: `translate3d(${styles.offset}%, 0, 0)`
            };
        }         
    }
};