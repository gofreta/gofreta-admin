import ApiClient from '@/utils/ApiClient'

export default {
    name: 'forgotten-password',
    data() {
        return {
            username: '',
            success: false
        }
    },
    mounted() {
        this.$setDocumentTitle('Forgotten Password');
    },
    methods: {
        /**
         * Handles forgotten password form submission.
         */
        onSubmit() {
            this.$showLoader();

            ApiClient.Auth.sendResetPasswordEmail(this.username).then((response) => {
                this.success = true;

                this.$hideLoader();
            }).catch((err) => {
                this.$hideLoader();

                this.$errResponseHandler(err);
            });
        }
    }
}
