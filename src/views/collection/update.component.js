import ApiClient     from '@/utils/ApiClient'
import CommonHelper from '@/utils/CommonHelper'
import Form          from './Form'

export default {
    name: 'collection-update',
    components: {
        'collection-form': Form,
    },
    data() {
        return {
            errors: {}
        }
    },
    mounted() {
        this.loadCollection();
    },
    methods: {
        /**
         * Loads and sets single collection model.
         *
         * @param {String}   [cid]
         * @param {Function} [callback]
         */
        loadCollection(cid, callback) {
            cid = cid || this.$route.params.cid;

            this.$refs.inlineLoader.show();

            ApiClient.Collection.getOne(cid).then((response) => {
                this.$refs.collectionForm.collection.load(response.data)

                if (CommonHelper.isFunction(callback)) {
                    callback(response.data);
                }

                this.$refs.inlineLoader.hide();
            }).catch((err) => {
                this.$refs.inlineLoader.hide();

                if (err.response && err.response.status == 404) {
                    this.$router.replace({ name: 'collection-index' });
                }

                this.$errResponseHandler(err);
            });
        },

        /**
         * Handles update form submission.
         */
        onSubmit(collectionData) {
            var cid = this.$route.params.cid;

            this.$showLoader();

            ApiClient.Collection.update(cid, collectionData).then((response) => {
                this.$hideLoader();

                this.$notify('Successfully updated collection settings.', 'success');

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
