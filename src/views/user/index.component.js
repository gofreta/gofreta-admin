import ApiClient    from '@/utils/ApiClient'
import AuthHelper   from '@/utils/AuthHelper'
import CommonHelper from '@/utils/CommonHelper'
import {UserModel}  from '@/models/UserModel'

const ITEMS_PER_PAGE = 15;

export default {
    name: 'user-index',
    data() {
        return {
            items: [],
            currentUser: null
        }
    },
    mounted() {
        this.$setDocumentTitle('Settings - Users');

        this.currentUser = AuthHelper.getData('user');

        this.loadItems(this.$route.query.page);
    },
    watch: {
        '$route.query.page'(val) {
            this.loadItems(val);
        }
    },
    methods: {
        /**
         * Loads and initializes compoment user model items.
         *
         * @param {Number} [page]
         * @param {Number} [limit]
         */
        loadItems(page = 1, limit = ITEMS_PER_PAGE) {
            this.$refs.inlineLoader.show();

            ApiClient.User.getList(page, limit).then((response) => {
                this.items = UserModel.getInstances(response.data);

                this.$refs.paging.currentPage = response.headers['x-pagination-current-page'] << 0 || 1;
                this.$refs.paging.totalPages  = response.headers['x-pagination-page-count'] << 0   || 1;

                this.$refs.inlineLoader.hide();
            }).catch((err) => {
                this.$refs.inlineLoader.hide();

                this.$errResponseHandler(err);
            });
        },

        /**
         * Handles user model delete confirmation dialog.
         *
         * @param {String} id
         */
        onDelete(id) {
            if (window.confirm('Are you really sure you want to delete the selected user?')) {
                this.deleteUser(id)
            }
        },

        /**
         * Handles the actual user model deletion.
         *
         * @param {String} id
         */
        deleteUser(id) {
            this.$showLoader();

            ApiClient.User.delete(id).then((response) => {
                CommonHelper.deleteArrayObject(this.items, 'id', id);

                this.$hideLoader();

                if (this.$refs.paging.totalPages > 1) {
                    this.loadItems(this.$route.query.page);
                }

                this.$notify('Successfully deleted user.', 'success');
            }).catch((err) => {
                this.$hideLoader();

                this.$errResponseHandler(err);
            });
        }
    }
}
