// 用户鉴权
import StorageService from './storage';
// import { userLogout } from 'actions/userAccount';
class Auth {
    constructor() {
        this.prefix = 'USER';
        this.user = this.__getLocalUser();
        this.basefields = {
            client_id: __CLIENT_ID__,
            client_secret: __CLIENT_SECRET__
        };
    }
    login(user) {
        return new Promise((resolve, reject) => {
            fetch('/account/login', {
                method: 'POST',
                body: JSON.stringify(Object.assign({
                    grant_type: 'totp'
                }, this.basefields, user))
            })
                .then(userInfo => {
                    StorageService.set(this.prefix, userInfo);
                    resolve(userInfo);
                })
                .catch(error => reject(error));
        });
    }
    loggedIn() {
        const user = this.__getLocalUser();
        return !!user;
    }
    getToken() {
        const user = this.__getLocalUser();
        if (user) {
            const { access_token: Token, refresh_token: refreshToken } = user;
            return { Token, refreshToken };
        }
        return null;
    }
    getProfile() {
        this.user = this.__getLocalUser();
        return this.user;
    }
    logout(cb) {
        StorageService.remove(this.prefix);
        if ($$.isFunction(cb)) cb(true);
    }
    refreshToken() {
        return new Promise((resolve, reject) => {
            const token = this.getToken() || {};
            const refreshToken = token.refreshToken;
            if (!refreshToken) return reject(false);
            fetch('/account/refresh', {
                method: 'POST',
                body: JSON.stringify(Object.assign({
                    grant_type: 'refresh_token'
                }, this.basefields, {
                    refresh_token: refreshToken
                }))
            })
                .then(userInfo => {
                    const { phone } = this.getProfile();
                    userInfo.phone = phone;
                    StorageService.set(this.prefix, userInfo);
                    this.user = userInfo;
                    resolve(userInfo);
                })
                .catch(error => {
                    StorageService.remove(this.prefix);
                    reject(error);
                });
        });
    }
    __getLocalUser() {
        const user = StorageService.get(this.prefix);
        return user;
    }    
}

module.exports = new Auth;