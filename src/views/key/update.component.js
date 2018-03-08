import ApiClient    from '@/utils/ApiClient'
import CommonHelper from '@/utils/CommonHelper'
import {KeyModel}   from '@/models/KeyModel'
import Form         from './Form'

export default {
    name: 'key-update',
    components: {
        'key-form': Form
    },
    data() {
        return {
            key: new KeyModel
        }
    },
    mounted() {
        this.$setDocumentTitle('Keys - Update');

        this.loadKey(this.$route.params.id);
    },
    methods: {
        /**
         * Loads and initializes component key model.
         *
         * @param {String}   id
         * @param {Function} [callback]
         */
        loadKey(id, callback) {
            this.$refs.inlineLoader.show();

            ApiClient.Key.getOne(id).then((response) => {
                this.key.load(response.data);

                if (CommonHelper.isFunction(callback)) {
                    callback(response.data);
                }

                this.$refs.inlineLoader.hide();
            }).catch((err) => {
                this.$refs.inlineLoader.hide();

                if (err.response && err.response.status == 404) {
                    this.$router.replace({ name: 'key-index' });
                }

                this.$errResponseHandler(err);
            });
        },

        /**
         * Takes care for key update form submission.
         *
         * @param {Object} keyData
         */
        updateKey(keyData) {
            this.$showLoader();

            ApiClient.Key.update(this.key.id, keyData).then((response) => {
                this.$hideLoader();

                this.$router.replace({ name: 'key-index' });

                this.$notify('Successfully updated key.', 'success');
            }).catch((err) => {
                this.$hideLoader();

                this.$errResponseHandler(err);
            });
        }
    }
}
