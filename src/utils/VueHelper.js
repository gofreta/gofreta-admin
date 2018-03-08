import Vue          from 'vue';
import moment       from 'moment'
import ApiClient    from '@/utils/ApiClient'
import CommonHelper from '@/utils/CommonHelper'
import AuthHelper   from '@/utils/AuthHelper'

/**
 * Custom Vue instance helpers.
 *
 * @author Gani Georgiev <gani.georgiev@gmail.com>
 */
export default {
    install(Vue, options) {
        /**
         * Sets app document title.
         *
         * @param {String} title
         */
        Vue.prototype.$setDocumentTitle = function (title) {
            if (title) {
                document.title = title + " | " + APP_CONFIG.baseTitle;
            } else {
                document.title = APP_CONFIG.baseTitle;
            }
        };

        /**
         * @return {Object}
         */
        Vue.prototype.$appConfig = function () {
            return APP_CONFIG;
        };

        /**
         * Redirect to app homepage.
         */
        Vue.prototype.$goToHomepage = function () {
            return this.$router.push({ name: APP_CONFIG.homepageRoute })
        };

        /**
         * Adds additional query parameters to the current route ones.
         *
         * @return {Object}
         */
        Vue.prototype.$extendQuery = function (queryParams = {}) {
            return Object.assign({}, this.$route.query, queryParams || {});
        };

        /**
         * @see `AuthHelper.isGuest()`
         */
        Vue.prototype.$isGuest = function () {
            return AuthHelper.isGuest();
        };

        /**
         * @see `AuthHelper.canAccess()`
         */
        Vue.prototype.$canAccess = function (group, action) {
            return AuthHelper.canAccess(group, action);
        };

        /**
         * Logouts the current user by taking care of cleaning cached token and user data.
         *
         * @param  {Boolean} [redirect] Whether to redirect to the login page.
         * @return {}
         */
        Vue.prototype.$logout = function (redirect = true) {
            AuthHelper.resetData();

            ApiClient.setToken();

            if (redirect) {
                this.$nextTick(() => {
                    this.$router.push({ name: 'login' });
                });
            }
        };

        /**
         * Generates random string key.
         *
         * @param  {Number} length
         * @return {Boolean}
         */
        Vue.prototype.$randomKey = function (length = 6) {
            return CommonHelper.randomString(length);
        };

        /**
         * Returns human readable version of a string.
         *
         * @param  {String} str
         * @return {String}
         */
        Vue.prototype.$humanize = function (str) {
            return CommonHelper.humanize(str);
        };

        /**
         * Returns formatted unix timestamp.
         *
         * @param  {Number} timestamp Unix timestamp in seconds
         * @return {String}
         */
        Vue.prototype.$formatDate = function (timestamp) {
            if (timestamp > 0) {
                return moment.unix(timestamp).format(APP_CONFIG.dateFormat);
            }

            return 'N/A';
        };

        /**
         * Generic apiclient error response handler.
         * @param {Error} err
         * @param {String} defaultMsg
         */
        Vue.prototype.$errResponseHandler = function (err, notify = true) {
            if (typeof err !== 'object') {
                return;
            }

            var responseData = CommonHelper.getNestedVal(err, 'response.data', {});
            var status       = responseData.status || CommonHelper.getNestedVal(err, 'response.status') || 503;

            if (status == 401) {
                AuthHelper.resetData();

                return this.$router.replace({ name: 'login' });
            } else if (status == 403) {
                return this.$router.replace({name: 'access-forbidden', params: {error: true}});
            }

            if (notify && typeof this.$notify !== 'undefined') {
                let msg = responseData.message || err.message;

                this.$notify(msg || defaultMsg, 'danger');
            }

            if (!CommonHelper.isEmpty(responseData.data)) {
                this.$registerFieldErrors(responseData.data);
            }
        };
    }
};
