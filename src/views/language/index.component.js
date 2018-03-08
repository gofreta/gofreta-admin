import ApiClient       from '@/utils/ApiClient'
import CommonHelper    from '@/utils/CommonHelper'
import {LanguageModel} from '@/models/LanguageModel'

const ITEMS_PER_PAGE = 15;

export default {
    name: 'language-index',
    data() {
        return {
            items: []
        }
    },
    mounted() {
        this.$setDocumentTitle('Languages');

        this.loadItems(this.$route.query.page);
    },
    watch: {
        '$route.query.page'(val) {
            this.loadItems(val);
        }
    },
    methods: {
        /**
         * Loads and initializes compoment language model items.
         *
         * @param {Number} [page]
         * @param {Number} [limit]
         */
        loadItems(page = 1, limit = ITEMS_PER_PAGE) {
            this.$refs.inlineLoader.show();

            ApiClient.Language.getList(page, limit).then((response) => {
                this.items = LanguageModel.getInstances(response.data);

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
         * Handles language model delete confirmation dialog.
         *
         * @param {String} id
         */
        onDelete(id) {
            if (window.confirm('Are you really sure you want to delete the selected language?')) {
                this.deleteLanguage(id)
            }
        },

        /**
         * Handles the actual language model deletion.
         *
         * @param {String} id
         */
        deleteLanguage(id) {
            this.$showLoader();

            ApiClient.Language.delete(id).then((response) => {
                CommonHelper.deleteArrayObject(this.items, 'id', id);

                this.$hideLoader();

                if (this.$refs.paging && this.$refs.paging.totalPages > 1) {
                    this.loadItems(this.$route.query.page);
                }

                this.$notify('Successfully deleted language item.', 'success');
            }).catch((err) => {
                this.$hideLoader();

                this.$errResponseHandler(err);
            });
        }
    }
}
