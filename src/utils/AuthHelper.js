import CommonHelper from '@/utils/CommonHelper'
import Cookies      from '@/utils/Cookies'

/**
 * AuthHelper takes care for storing and managing auth token and user data.
 *
 * @author Gani Georgiev <gani.georgiev@gmail.com>
 */
export default class AuthHelper {
    /**
     * @param {String}      token
     * @param {Object}      user
     * @param {String|Date} exp
     */
    static setData(token, user, exp) {
        if (CommonHelper.isString(exp)) {
            exp = new Date(exp);
        }

        var data = {
            'token': token,
            'user':  user,
            'exp':   exp
        };

        Cookies.setItem(APP_CONFIG.authCookieKey, JSON.stringify(data), exp, '/');
    }

    /**
     * Retrieves stored auth data.
     * If `key` is provided, it will return its value (if exists, otherwise - null).
     *
     * @param  {String} [key]
     * @return {Mixed}
     */
    static getData(key) {
        var data = {};

        try {
            data = JSON.parse(Cookies.getItem(APP_CONFIG.authCookieKey)) || {};
        } catch (e) {
        }

        if (key) {
            return data[key] || null;
        }

        return data;
    }

    /**
     * Removes stored auth data.
     */
    static resetData() {
        Cookies.removeItem(APP_CONFIG.authCookieKey, '/')
    }

    /**
     * Checks whether there any stored user data.
     *
     * @return {Boolean}
     */
    static isGuest() {
        return !Cookies.getItem(APP_CONFIG.authCookieKey) ? true : false;
    }

    /**
     * @todo Use some sort of cache to prevent multiple `JSON.parse()` calls when call `this.getData()`.
     *
     * Checks if the current stored user is allowed to access an API resource.
     *
     * @param  {String}  group  (eg. 'media')
     * @param  {String}  action (eg. 'index')
     * @return {Boolean}
     */
    static canAccess(group, action) {
        var user = this.getData('user');

        if (user && user.access && CommonHelper.isArray(user.access[group])) {
            return CommonHelper.inArray(user.access[group], action);
        }

        return false;
    }
}
