import ApiClient       from '@/utils/ApiClient'
import CommonHelper    from '@/utils/CommonHelper'
import {LanguageModel} from '@/models/LanguageModel'
import Form            from './Form'

export default {
    name: 'language-update',
    components: {
        'language-form': Form
    },
    data() {
        return {
            language: new LanguageModel
        }
    },
    mounted() {
        this.$setDocumentTitle('Languages - Update');

        this.loadLanguage(this.$route.params.id);
    },
    methods: {
        /**
         * Loads and initializes component language model.
         *
         * @param {String}   id
         * @param {Function} [callback]
         */
        loadLanguage(id, callback) {
            this.$refs.inlineLoader.show();

            ApiClient.Language.getOne(id).then((response) => {
                this.language.load(response.data);

                if (CommonHelper.isFunction(callback)) {
                    callback(response.data);
                }

                this.$refs.inlineLoader.hide();
            }).catch((err) => {
                this.$refs.inlineLoader.hide();

                if (err.response && err.response.status == 404) {
                    this.$router.replace({ name: 'language-index' });
                }

                this.$errResponseHandler(err);
            });
        },

        /**
         * Takes care for language update form submission.
         *
         * @param {Object} langData
         */
        updateLanguage(langData) {
            this.$showLoader();

            ApiClient.Language.update(this.language.id, langData).then((response) => {
                this.$hideLoader();

                this.$router.replace({ name: 'language-index' });

                this.$notify('Successfully updated language item.', 'success');
            }).catch((err) => {
                this.$hideLoader();

                this.$errResponseHandler(err);
            });
        }
    }
}
