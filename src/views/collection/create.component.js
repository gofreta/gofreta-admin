import CommonHelper from '@/utils/CommonHelper'
import ApiClient     from '@/utils/ApiClient'
import Form          from './Form'

export default {
    name: 'collection-create',
    components: {
        'collection-form': Form,
    },
    data() {
        return {
            errors: {}
        }
    },
    mounted() {
        this.$setDocumentTitle('Collections Create');
    },
    methods: {
        /**
         * Handles create form submission.
         */
        onSubmit(collectionData) {
            this.$showLoader();

            ApiClient.Collection.create(collectionData).then((response) => {
                this.$hideLoader();

                this.$router.push({
                    'name':   'entity-index',
                    'params': { 'cid': response.data.name }
                });
            }).catch((err) => {
                this.$hideLoader();

                this.errors = CommonHelper.getNestedVal(err, 'response.data.data', {});

                this.$errResponseHandler(err);
            });
        }
    }
}
