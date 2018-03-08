import AuthHelper from '@/utils/AuthHelper'
import ApiClient  from '@/utils/ApiClient'

export default {
    name: 'login',
    data() {
        return {
            errorMessage: '',
            username:     '',
            password:     ''
        }
    },
    mounted() {
        this.$setDocumentTitle('Login');
    },
    methods: {
        /**
         * Handles login form submission.
         */
        onSubmit() {
            this.$showLoader();

            ApiClient.Auth.login(this.username, this.password).then((response) => {
                var expireTime = new Date(response.data.expire * 1000);

                AuthHelper.setData(response.data.token, response.data.user, expireTime);

                ApiClient.setToken(response.data.token);

                this.reset();

                this.$goToHomepage();

                this.$hideLoader();
            }).catch((err) => {
                this.$hideLoader();

                if (err.response && err.response.data) {
                    this.showError(err.response.data.message);
                } else {
                    this.showError();
                }
            });
        },

        /**
         * Resets login form fields.
         */
        reset() {
            this.username = '';
            this.password = '';
        },

        /**
         * Sets and shows login form error message.
         *
         * @param {String} [message]
         */
        showError(message) {
            this.errorMessage = message || 'Oops, something went wrong while processing the request.';

            this.$nextTick(() => {
                this.$refs.errors.show();
            });
        }
    }
}
