import ApiClient         from '@/utils/ApiClient'
import CommonHelper      from '@/utils/CommonHelper'
import {CollectionModel} from '@/models/CollectionModel'
import Form              from './Form'

export default {
    name: 'entity-create',
    components: {
        'entity-form': Form,
    },
    data() {
        return {
            collection: new CollectionModel(),
            errors: {}
        }
    },
    mounted() {
        this.loadCollection(this.$route.params.cid);
    },
    methods: {
        /**
         * Loads and initializes the compoment collection model.
         *
         * @param {String}   [cid]
         * @param {Function} [callback]
         */
        loadCollection(cid, callback) {
            cid = cid || this.$route.params.cid;

            this.$refs.inlineLoader.show();

            ApiClient.Collection.getOne(cid).then((response) => {
                this.$refs.inlineLoader.hide();

                this.collection.load(response.data);

                this.$setDocumentTitle(this.collection.title + ' - Create New Item');

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
         * Takes care for entity create form submission.
         *
         * @param {Object} entityData
         */
        createEntity(entityData) {
            this.$showLoader();

            ApiClient.Entity.create(this.collection.name, entityData).then((response) => {
                this.$hideLoader();

                this.$router.replace({ name: 'entity-index', params: { name: this.collection.name }});

                this.$notify('Successfully created new entity item.', 'success');
            }).catch((err) => {
                this.$hideLoader();

                this.errors = CommonHelper.getNestedVal(err, 'response.data.data', {});

                this.$errResponseHandler(err);
            });
        }
    }
}
