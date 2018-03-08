import ListingMixin from './ListingMixin'
import UploadForm   from './UploadForm'

export default {
    mixins: [ ListingMixin ],
    name: 'media-picker',
    components: {
        'upload-form': UploadForm,
    },
    data() {
        return {
            itemsPerPage:    12,
            syncQueryParams: false,
            activeTab:       'listing'
        }
    },
    methods: {
        /**
         * Emits the provided media item.
         *
         * @param {Object} item
         */
        onItemSelect(item) {
            this.$emit('select', item);
        },

        /**
         * Loads media items and opens the media popup.
         */
        show() {
            this.loadItems();

            this.$refs.mediaPopup.show();

            this.$emit('show');
        },

        /**
         * Closes the media popup.
         */
        hide() {
            this.$refs.mediaPopup.hide();

            this.$emit('hide');
        },

        /**
         * Handles files upload event.
         *
         * @param {Array} responses
         */
        onUploadComplete(responses) {
            this.resetList();

            for (let i in responses) {
                // atleast 1 file is uploaded successfully
                if (responses[i].items.length > 0) {
                    this.changeTab('listing');

                    break;
                }
            }
        },

        /**
         * Takes care for media items pagination.
         *
         * @param {Number} page
         */
        onPageChange(page) {
            this.loadItems(page);
        },

        /**
         * Active tab change handler.
         *
         * @param {String} tab
         */
        changeTab(tab) {
            this.activeTab = tab;
        }
    }
}
