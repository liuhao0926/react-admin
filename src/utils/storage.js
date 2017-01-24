// 数据缓存服务
class StorageService {
    constructor() {
        this.prefix = '_FEELBUS_';
        // Global cache expiry
        this.expiry = 86400000;
        this.storage = window.localStorage;
    }
    set(key, value, expiry) {
        expiry = +expiry || this.expiry;
        const cacheObject = JSON.stringify({
            expiry: +new Date() + expiry,
            data: value
        });
        this.storage.setItem(this.prefix + key, cacheObject);
        return value;
    }
    get(key, nullCallback) {
        key = this.prefix + key;
        const cache = this.storage.getItem(key);
        if (cache) {
            const object = JSON.parse(cache);
            const dataNow = new Date().getTime();
            if (object.expiry && object.expiry < dataNow) 
                {return this.storage.removeItem(key);}
            
            return object.data;
        }
        if (typeof nullCallback === 'function') 
            {return nullCallback(key);}
        
        return null;
    }
    remove(key) {
        this.storage.removeItem(this.prefix + key);
    }
}
export default new StorageService();
