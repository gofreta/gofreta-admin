import ApiClient from '@/utils/ApiClient'
import Form      from './Form'

export default {
    name: 'key-create',
    components: {
        'key-form': Form
    },
    data() {
        return {
        }
    },
    mounted() {
        this.$setDocumentTitle('Keys - Create');
    },
    methods: {
        /**
         * Takes care for key create form submission.
         *
         * @param {Object} keyData
         */
        createKey(keyData) {
            this.$showLoader();

            ApiClient.Key.create(keyData).then((response) => {
                this.$hideLoader();

                this.$router.replace({ name: 'key-index' });

                this.$notify('Successfully added new key.', 'success');
            }).catch((err) => {
                this.$hideLoader();

                this.$errResponseHandler(err);
            });
        }
    }
}
