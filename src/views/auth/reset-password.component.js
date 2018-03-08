import ApiClient from '@/utils/ApiClient'

export default {
    name: 'reset-password',
    data() {
        return {
            resetHash:       '',
            password:        '',
            passwordConfirm: ''
        }
    },
    mounted() {
        this.$setDocumentTitle('Reset Password');
    },
    methods: {
        /**
         * Handles reset password form submission.
         */
        onSubmit() {
            this.$showLoader();

            ApiClient.Auth.resetPassword(this.resetHash, this.password, this.passwordConfirm).then((response) => {
            	this.$notify('Your password was successfully reseted.', 'success');

            	this.$router.push({ name: 'login' })

                this.$hideLoader();
            }).catch((err) => {
                this.$hideLoader();

                this.$errResponseHandler(err);
            });
        }
    }
}
