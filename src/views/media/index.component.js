import ApiClient    from '@/utils/ApiClient'
import CommonHelper from '@/utils/CommonHelper'
import UploadForm   from './UploadForm'
import ListingMixin from './ListingMixin'

export default {
    mixins: [ ListingMixin ],
    name: 'media',
    components: {
        'upload-form': UploadForm
    },
    data() {
        return {
            syncQueryParams: true,
            bulkSelected: []
        }
    },
    mounted() {
        this.$setDocumentTitle("Media");

        this.type = this.$route.query.type || Object.keys(this.typeOptions)[0];
        this.sort = this.$route.query.sort || Object.keys(this.sortOptions)[0];

        this.loadItems(this.$route.query.page);
    },
    methods: {
        // Bulk
        // -----------------------------------------------------------
        /**
         * Deletes single media item.
         *
         * @param {String}   id
         * @param {Function} [callback]
         */
        deleteItem(id, callback) {
            this.$showLoader();

            ApiClient.Media.delete(id).then((response) => {
                CommonHelper.deleteArrayObject(this.items, 'id', id);

                if (CommonHelper.isFunction(callback)) {
                    callback();
                }

                this.$hideLoader();
            }).catch((err) => {
                this.$hideLoader();

                this.$errResponseHandler(err);
            });
        },

        /**
         * Bulk delete selected media items.
         */
        processDeleteBulkCelection() {
            var id = this.bulkSelected.pop();

            this.deleteItem(id, () => {
                if (this.bulkSelected.length) {
                    this.processDeleteBulkCelection()
                } else {
                    this.resetList(true);

                    this.$notify('Successfully completed bulk deletion.', 'success');
                }
            });
        },

        /**
         * Takes care for the bulk delete confirmation.
         */
        deleteBulkSelection() {
            if (window.confirm('Do you really want to delete the selected file(s)?')) {
                this.processDeleteBulkCelection();
            } else {
                this.resetBulkSelection();
            }
        },

        /**
         * Resets bulk selection.
         */
        resetBulkSelection() {
            this.bulkSelected = [];
        },

        // Upload
        // -----------------------------------------------------------
        /**
         * Opens the upload popup.
         */
        showUploadPopup() {
            this.$refs.uploadPopup.show();
        },

        /**
         * Handles upload queue complete event.
         *
         * @param {Array} responses
         */
        onUploadComplete(responses) {
            this.resetList();

            for (let i in responses) {
                if (responses[i].items.length > 0) {
                    // hide the popup if atleast 1 file was uploaded successfully
                    this.$refs.uploadPopup.hide();

                    break;
                }
            }
        }
    }
}
