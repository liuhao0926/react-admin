const getPrototypeOf = Object.getPrototypeOf;
const toString = Object.prototype.toString;
const isArray = (value) => {
    return Array.isArray ? Array.isArray(value) : toString.call(value) === '[object Array]';
};
const util = {
    isWeChatBrowser() {
        const userAgent = window.navigator.userAgent.toLocaleLowerCase();
        return userAgent.indexOf('micromessenger') !== -1;
    }, 
    isDefined(value) {
        return typeof value !== 'undefined';
    },
    isUndefined(value) {
        return typeof value === 'undefined';
    },
    isObject(value) {
        return value !== null && typeof value === 'object'
            && toString.call(value) === '[object Object]';
    },
    isEmptyObject(value) {
        return Object.keys(value).length === 0;
    },
    isBlankObject(value) {
        return value !== null && typeof value === 'object' && !getPrototypeOf(value);
    },
    isString(value) {
        return typeof value === 'string';
    },
    isNumber(value) {
        return typeof value === 'number';
    },
    isDate(value) {
        return toString.call(value) === '[object Date]';
    },
    isArray,
    isFunction(value) {
        return typeof value === 'function';
    },
    isBoolean(value) {
        return typeof value === 'boolean';
    },
    isPromiseLike(obj) {
        return obj && this.isFunction(obj.then);
    },
    includes(array, obj) {
        return Array.prototype.indexOf.call(array, obj) !== -1;
    },
    arrayRemove(array, value) {
        const index = array.indexOf(value);
        if (index >= 0) {
            array.splice(index, 1);
        }
        return index;
    },
    isWindow(obj) {
        return obj && obj.window === obj;
    },
    createMap() {
        return Object.create(null);
    },
    isRegExp(value) {
        return toString.call(value) === '[object RegExp]';
    },
    equals(o1, o2) {
        const self = this;
        if (o1 === o2) return true;
        if (o1 === null || o2 === null) return false;
        if (o1 !== o1 && o2 !== o2) return true; // NaN === NaN
        let t1 = typeof o1, t2 = typeof o2, length, key, keySet;
        if (t1 === t2 && t1 === 'object') {
            if (self.isArray(o1)) {
                if (!self.isArray(o2)) return false;
                if ((length = o1.length) === o2.length) {
                    for (key = 0; key < length; key++) {
                        if (!self.equals(o1[key], o2[key])) return false;
                    }
                    return true;
                }
            } else if (self.isDate(o1)) {
                if (!self.isDate(o2)) return false;
                return self.equals(o1.getTime(), o2.getTime());
            } else if (self.isRegExp(o1)) {
                if (!self.isRegExp(o2)) return false;
                return o1.toString() === o2.toString();
            } else {
                keySet = self.createMap();
                for (key in o1) {
                    if (key.charAt(0) === '$' || self.isFunction(o1[key])) continue;
                    if (!self.equals(o1[key], o2[key])) return false;
                    keySet[key] = true;
                }
                for (key in o2) {
                    if (!(key in keySet) &&
                        key.charAt(0) !== '$' &&
                        self.isDefined(o2[key]) &&
                        !self.isFunction(o2[key])) return false;
                }
                return true;
            }
        }
        return false;
    }

};
window.$$ = window.$$ || util;
export default window.$$;