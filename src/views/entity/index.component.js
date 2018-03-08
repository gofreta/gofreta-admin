import ApiClient         from '@/utils/ApiClient'
import {CollectionModel} from '@/models/CollectionModel'
import List              from './List'

export default {
    name: 'entity-index',
    components: {
        'entities-list': List
    },
    data() {
        return {
            collection: new CollectionModel()
        }
    },
    mounted() {
        this.$refs.entitiesList.init();
    },
    methods: {
        /**
         * Initializes and load `data` into the component collection model.
         *
         * @param {Object} data
         */
        initCollection(data) {
            this.collection.load(data);
        },

        /**
         * Handles entity delete confirmation dialog.
         *
         * @param {String} id
         */
        onDelete(id) {
            if (window.confirm('Are you really sure you want to remove the selected entity item?')) {
                this.deleteEntity(id);
            }
        },

        /**
         * Handles the actual entity item deletion.
         *
         * @param {String} id
         */
        deleteEntity(id) {
            this.$showLoader();

            ApiClient.Entity.delete(this.collection.name, id).then((response) => {
                this.$hideLoader();

                this.$refs.entitiesList.loadEntities();

                this.$notify('Successfully deleted entity item.', 'success');
            }).catch((err) => {
                this.$hideLoader();

                this.$errResponseHandler(err);
            });
        }
    }
}
