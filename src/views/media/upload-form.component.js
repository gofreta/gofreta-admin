import ApiClient  from '@/utils/ApiClient'
import AuthHelper from '@/utils/AuthHelper'
import Dropzone   from 'dropzone'


export default {
    name: 'upload-form',
    data() {
        return {
            dropzone: null,
            uploading: false,
            formKey: this.$randomKey(),
            responses: []
        }
    },
    mounted() {
        Dropzone.autoDiscover = false;

        this.initDropzone();
    },
    methods: {
        /**
         * Initializes component's dropzone instance.
         */
        initDropzone() {
            var token = AuthHelper.getData('token');

            this.dropzone = new Dropzone(this.$refs.uploadContainer, {
                url: ApiClient.$baseUrl + '/media',
                paramName: 'file',
                parallelUploads: 5,
                uploadMultiple: true,
                thumbnailWidth: null,
                thumbnailHeight: null,
                addRemoveLinkss: false,
                createImageThumbnails: false,
                previewTemplate: '<div style="display: none"></div>',
                headers: {
                    'Authorization': ('Bearer ' + token)
                },
            })

            this.dropzone.on('sendingmultiple', (file, xhr, formData) => {
                this.uploading = true;

                this.$showLoader();

                this.$emit('upload-sending', file, xhr, formData);
            });

            this.dropzone.on('errormultiple', (files, message, xhr) => {
                this.$emit('errormultiple', files, message, xhr);
            });

            this.dropzone.on('successmultiple', (files, response) => {
                this.responses.push(response)

                this.$emit('successmultiple', files, response);
            });

            this.dropzone.on('queuecomplete', () => {
                this.uploading = false;

                this.$hideLoader();

                var totalUploadedFiles = 0;
                for (let i in this.responses) {
                    totalUploadedFiles += this.responses[i].items.length;
                }

                if (totalUploadedFiles > 0) {
                    this.$notify('Successfully uploaded ' + totalUploadedFiles + ' file' + (totalUploadedFiles > 1 ? 's' : '')+ '.', 'success');
                } else {
                    this.$notify('Oops, an error occurred while uploading the selected file(s).', 'danger');
                }

                this.$emit('queuecomplete', this.responses.slice(0))

                this.responses = [];
            });
        }
    }
}
