import ApiClient    from '@/utils/ApiClient'
import CommonHelper from '@/utils/CommonHelper'
import {KeyModel}   from '@/models/KeyModel'

const ITEMS_PER_PAGE = 15;

export default {
    name: 'key-index',
    data() {
        return {
            items: []
        }
    },
    mounted() {
        this.$setDocumentTitle('Keys');

        this.loadItems(this.$route.query.page);
    },
    watch: {
        '$route.query.page'(val) {
            this.loadItems(val);
        }
    },
    methods: {
        /**
         * Loads and initializes compoment key model items.
         *
         * @param {Number} [page]
         * @param {Number} [limit]
         */
        loadItems(page = 1, limit = ITEMS_PER_PAGE) {
            this.$refs.inlineLoader.show();

            ApiClient.Key.getList(page, limit).then((response) => {
                this.items = KeyModel.getInstances(response.data);

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
         * Handles key model delete confirmation dialog.
         *
         * @param {String} id
         */
        onDelete(id) {
            if (window.confirm('Are you really sure you want to delete the selected key?')) {
                this.deleteKey(id)
            }
        },

        /**
         * Handles the actual key model deletion.
         *
         * @param {String} id
         */
        deleteKey(id) {
            this.$showLoader();

            ApiClient.Key.delete(id).then((response) => {
                CommonHelper.deleteArrayObject(this.items, 'id', id);

                this.$hideLoader();

                if (this.$refs.paging && this.$refs.paging.totalPages > 1) {
                    this.loadItems(this.$route.query.page);
                }

                this.$notify('Successfully deleted key item.', 'success');
            }).catch((err) => {
                this.$hideLoader();

                this.$errResponseHandler(err);
            });
        }
    }
}
