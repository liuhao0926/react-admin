// 数据缓存服务
class StorageService {
    constructor() {
        this.prefix = '_FEELBUS_';
        // Global cache expiry
        // this.expiry = 86400000;
        this.storage = window.document;
    }
    set(key, value) {
        const cacheObject = JSON.stringify(value);
        this.storage.cookie = this.prefix + key + '=' + escape (cacheObject) + ';';
        return cacheObject;
    }
    get(key) {
        key = this.prefix + key;
        const reg = new RegExp(`(^| )${key}=([^;]*)(;|$)`);
        let result = this.storage.cookie.match(reg);
        if(result) {
            result = JSON.parse(unescape(result[2]));
            return result;
        } else {
            return null;
        }
    }
    remove(key) {
        key = this.prefix + key;
        const exp = new Date();
        exp.setTime(exp.getTime() - 1);
        const cval = this.get(key);
        if(cval !== null) {
            // this.storage.cookie = key + "=" + cval + ";expires=" + exp.toGMTString();
            this.storage.cookie = `${key}=${cval};expires=${exp.toGMTString()}`;
        }
    }
}
export default new StorageService();
