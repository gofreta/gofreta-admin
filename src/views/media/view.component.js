import ApiClient      from '@/utils/ApiClient'
import { MediaModel } from '@/models/MediaModel'

export default {
    name: 'media-view',
    data() {
        return {
            item: new MediaModel(),
            originalItem: {}
        }
    },
    computed: {
        hasChanges() {
            return (
                this.originalItem.title != this.item.title ||
                this.originalItem.description != this.item.description
            );
        }
    },
    mounted() {
        this.$setDocumentTitle("Media File Preview");

        this.loadItem(this.$route.params.id);
    },
    methods: {
        /**
         * Loads and initializes single media item.
         *
         * @param {String} id
         */
        loadItem(id) {
            this.$refs.inlineLoader.show();

            ApiClient.Media.getOne(id).then((response) => {
                this.item.load(response.data);

                this.originalItem = this.item.export();

                this.$refs.inlineLoader.hide();
            }).catch((err) => {
                this.$refs.inlineLoader.hide();

                if (err.response && err.response.status == 404) {
                    this.$router.replace({ name: APP_CONFIG.homepageRoute })
                }

                this.$errResponseHandler(err);
            });
        },

        /**
         * Handles update form submission.
         */
        onSubmit() {
            this.$showLoader();

            ApiClient.Media.update(this.item.id, this.item.title, this.item.description).then((response) => {
                this.$hideLoader();

                this.item.load(response.data);

                this.originalItem = this.item.export();

                this.$notify('Successfully saved changes.', 'success');
            }).catch((err) => {
                this.$hideLoader();

                this.$errResponseHandler(err);
            });
        },

        /**
         * Resets form fields.
         */
        onReset() {
            this.item.load(this.originalItem);
        },

        /**
         * Deletes the initialized media item.
         */
        deleteFile() {
            if (!window.confirm('Are you sure you want to delete the file?')) {
                return;
            }

            this.$showLoader();

            ApiClient.Media.delete(this.item.id).then((response) => {
                this.$hideLoader();

                this.$notify('Successfully deleted file.', 'success');

                this.$router.replace({ 'name': 'media-index' });
            }).catch((err) => {
                this.$hideLoader();

                this.$errResponseHandler(err);
            });
        }
    }
}
