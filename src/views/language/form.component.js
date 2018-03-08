import CommonHelper    from '@/utils/CommonHelper'
import {LanguageModel} from '@/models/LanguageModel'

export default {
    name: 'language-form',
    props: {
        scenario: {
            type: String,
            default: 'create'
        },
        language: {
            type: LanguageModel
        }
    },
    data() {
        return {
            model: new LanguageModel
        }
    },
    mounted() {
        if (this.language) {
            this.load(this.language.export());
        }
    },
    watch: {
        'model.locale': function (val) {
            this.model.locale = CommonHelper.slugify(val);
        }
    },
    methods: {
        /**
         * "Proxy" for the compoment `model.load()`.
         *
         * @param  {Object} data
         */
        load(data = {}) {
            this.model.load(data)
        },

        /**
         * Prepares language form for submission.
         */
        onSubmit() {
            this.$emit('submit', this.model.export());
        }
    }
}
