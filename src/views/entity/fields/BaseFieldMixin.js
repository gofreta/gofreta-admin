import CommonHelper from '@/utils/CommonHelper'
import {EntityModel} from '@/models/EntityModel'

export default {
    props: {
        field: {
            type: Object,
            required: true
        },
        languages: {
            type: Array,
            required: true
        },
        activeLocale: {
            type: String,
            required: true
        },
        entity: {
            type: EntityModel
        }
    },
    data() {
        return {
            uniqueId: 'field_' + this.$randomKey(),
            data: {},
        }
    },
    mounted() {
        this.initData();
    },
    methods: {
        /**
         * Inits entity field data for all initialized languages.
         */
        initData() {
            for (let i in this.languages) {
                let lang = this.languages[i];

                this.$set(this.data, lang.locale, this.entity.getFieldValue(this.field.key, lang.locale, this.field.default));
            }
        },

        /**
         * Handles field change event and resolves field multilingual behavior.
         */
        multilingualResolve() {
            if (!this.field.multilingual) {
                // since the field is not multilingual,
                // broadcast the current data to all language variations
                for (let i in this.languages) {
                    let lang = this.languages[i];

                    if (lang.local == this.activeLocale) {
                        continue;
                    }

                    this.$set(this.data, lang.locale, this.data[this.activeLocale])
                }
            }

            this.$emit('change', this.field, this.data);
        },

        /**
         * Returns field error message.
         *
         * @return {String}
         */
        getError() {
            if (this.$refs.field) {
                return CommonHelper.getNestedVal(this.$refs.field, 'error', '');
            }

            return '';
        },

        /**
         * Resolves and returns field data.
         *
         * @return {Object}
         */
        export() {
            var result = {'field': this.field.key};

            result.data = Object.assign({}, this.data);

            return result;
        }
    }
}
