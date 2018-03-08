import ApiClient         from '@/utils/ApiClient'
import CommonHelper     from '@/utils/CommonHelper'
import {CollectionModel} from '@/models/CollectionModel'

const ITEMS_PER_PAGE = 50;

export default {
    name: 'collection-index',
    data() {
        return {
            items: []
        }
    },
    mounted() {
        this.$setDocumentTitle('Collections');

        this.loadItems(this.$route.query.page);
    },
    watch: {
        '$route.query.page'(val) {
            this.loadItems(val);
        }
    },
    methods: {
        /**
         * Loads and initializes collection items.
         *
         * @param {Number} page
         * @param {Number} limit
         */
        loadItems(page = 1, limit = ITEMS_PER_PAGE) {
            this.$refs.inlineLoader.show();

            ApiClient.Collection.getList(page, limit).then((response) => {
                this.items = CollectionModel.getInstances(response.data);

                if (this.$refs.paging) {
                    this.$refs.paging.currentPage = response.headers['x-pagination-current-page'] << 0 || 1;
                    this.$refs.paging.totalPages  = response.headers['x-pagination-page-count'] << 0   || 1;
                }

                this.$refs.inlineLoader.hide();
            }).catch((err) => {
                this.$refs.inlineLoader.hide();

                this.$errResponseHandler(err);
            });
        },

        /**
         * Delete single collection item.
         *
         * @param {String} id
         */
        deleteCollection(id) {
            this.$showLoader();

            ApiClient.Collection.delete(id).then((response) => {
                CommonHelper.deleteArrayObject(this.items, 'id', id);

                this.$hideLoader();

                if (this.$refs.paging && this.$refs.paging.totalPages > 1) {
                    this.loadItems(this.$route.query.page);
                }

                this.$notify('Successfully deleted collection.', 'success');
            }).catch((err) => {
                this.$hideLoader();

                this.$errResponseHandler(err);
            });
        },

        /**
         * Returns the collection item index based on its id property.
         *
         * @param  {String} id
         * @return {Number}
         */
        getCollectionIndexById(id) {
            for (var i in this.items) {
                if (this.items[i].id == id) {
                    return i;
                }
            }

            return -1;
        },

        /**
         * Returns single collection item by its name property.
         *
         * @param  {String} name
         * @return {null|CollectionModel}
         */
        getCollectionByName(name) {
            for (var i in this.items) {
                if (this.items[i].name == name) {
                    return this.items[i];
                }
            }

            return null
        },

        /**
         * Opens collection item dropdown by its index.
         *
         * @param {Number} index
         */
        openDropdown(index) {
            var dropdowns = this.$refs['collection_dropdown'] || [];

            if (!dropdowns[index]) {
                return;
            }

            // close all other dropdowns
            for (var i in dropdowns) {
                dropdowns[i].hide();
            }

            dropdowns[index].show();
        },

        /**
         * Hides collection item dropdown by its index.
         *
         * @param {Number} index
         */
        hideDropdown(index) {
            var dropdown = CommonHelper.getNestedVal(this.$refs, 'collection_dropdown.' + index);
            if (dropdown) {
                dropdown.hide();
            }
        },

        /**
         * Handles single collection item delete prompt.
         *
         * @param {String} id
         */
        onDelete(id) {
            var name       = prompt("For confirmation, please type the collection name you want to delete:", "");
            var collection = this.getCollectionByName(name)

            // wrong collection name
            if (!collection) {
                if (!CommonHelper.isEmpty(name)) {
                    this.$notify('Collection with name "' + name + '" does not exist.', 'warning');
                }

                this.hideDropdown(this.getCollectionIndexById(id));

                return false;
            }

            // mismatch selection
            if (collection.id != id) {
                this.$notify('The collection you are trying to delete is different from the one you selected.', 'warning');

                this.hideDropdown(this.getCollectionIndexById(id));

                return false;
            }

            this.deleteCollection(collection.id);
        }
    }
}
