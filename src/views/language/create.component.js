import ApiClient    from '@/utils/ApiClient'
import CommonHelper from '@/utils/CommonHelper'
import Form         from './Form'

export default {
    name: 'language-create',
    components: {
        'language-form': Form
    },
    mounted() {
        this.$setDocumentTitle('Languages - Create');
    },
    methods: {
        /**
         * Takes care for language create form submission.
         *
         * @param {Object} langData
         */
        createLanguage(langData) {
            this.$showLoader();

            ApiClient.Language.create(langData).then((response) => {
                this.$hideLoader();

                this.$router.replace({ name: 'language-index' });

                this.$notify('Successfully added new language.', 'success');
            }).catch((err) => {
                this.$hideLoader();

                this.$errResponseHandler(err);
            });
        }
    }
}
