import ApiClient         from '@/utils/ApiClient'
import CommonHelper      from '@/utils/CommonHelper'
import {CollectionModel} from '@/models/CollectionModel'
import {EntityModel}     from '@/models/EntityModel'
import Form              from './Form'

export default {
    name: 'entity-update',
    components: {
        'entity-form': Form,
    },
    beforeRouteLeave (to, from, next) {
        if (!this.hasChanges || window.confirm('You have unsaved changes. Are you sure you want to ignore them?')) {
            return next();
        }
    },
    data() {
        return {
            hasChanges: false,
            collection: new CollectionModel(),
            entity:     new EntityModel(),
            errors:     {}
        }
    },
    mounted() {
        this.loadCollection(this.$route.params.cid);
        this.loadEntity(this.$route.params.id);
    },
    methods: {
        /**
         * Loads and initializes component collection model.
         * @param {String}   [cid]
         * @param {Function} [callback]
         */
        loadCollection(cid, callback) {
            cid = cid || this.$route.params.cid;

            this.$showLoader();

            ApiClient.Collection.getOne(cid).then((response) => {
                this.collection.load(response.data);

                this.$setDocumentTitle(this.collection.title + ' - Update Item');

                if (CommonHelper.isFunction(callback)) {
                    callback(response.data);
                }

                this.$hideLoader();
            }).catch((err) => {
                this.$hideLoader();

                if (err.response && err.response.status == 404) {
                    this.$router.replace({ name: 'collection-index' });
                }

                this.$errResponseHandler(err);
            });
        },

        /**
         * Loads and initializes component entity item.
         *
         * @param {Number}   [id]
         * @param {String}   [cid]
         * @param {Function} [callback
         */
        loadEntity(id, cid, callback) {
            id  = id  || this.$route.params.id;
            cid = cid || this.$route.params.cid;

            this.$refs.inlineLoader.show();

            ApiClient.Entity.getOne(cid, id).then((response) => {
                this.entity.load(response.data);

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
         * Form change event handler.
         * @param {Object} field
         * @param {Object} data
         * @param {String} activeLocale
         */
        onFormChange(field, data, activeLocale) {
            if (this.entity.getFieldValue(field.key, activeLocale) != data[activeLocale]) {
                this.hasChanges = true;
            }
        },

        /**
         * Takes care for entity form submission.
         *
         * @param {Object} entityData
         */
        updateEntity(entityData) {
            entityData = JSON.parse(JSON.stringify(entityData));

            this.$showLoader();

            ApiClient.Entity.update(this.collection.id, this.entity.id, entityData).then((response) => {
                this.hasChanges = false;

                this.$router.replace({ name: 'entity-index', params: { name: this.collection.name }});

                this.$notify('Successfully updated entity item.', 'success');

                this.$hideLoader();
            }).catch((err) => {
                this.$hideLoader();

                this.errors = CommonHelper.getNestedVal(err, 'response.data.data', {});

                this.$errResponseHandler(err);
            });
        }
    }
}
