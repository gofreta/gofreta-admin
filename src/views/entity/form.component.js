import ApiClient         from '@/utils/ApiClient'
import CommonHelper     from '@/utils/CommonHelper'
import {CollectionModel} from '@/models/CollectionModel'
import {EntityModel}     from '@/models/EntityModel'
import {LanguageModel}   from '@/models/LanguageModel'

// fields
import PlainField     from './fields/PlainField'
import EditorField    from './fields/EditorField'
import DateField      from './fields/DateField'
import SwitchField    from './fields/SwitchField'
import ChecklistField from './fields/ChecklistField'
import SelectField    from './fields/SelectField'
import MediaField     from './fields/MediaField'
import RelationField  from './fields/RelationField'

export default {
    name: 'entity-form',
    components: {
        'plain-field':     PlainField,
        'editor-field':    EditorField,
        'date-field':      DateField,
        'switch-field':    SwitchField,
        'checklist-field': ChecklistField,
        'select-field':    SelectField,
        'media-field':     MediaField,
        'relation-field':  RelationField
    },
    props: {
        collection: {
            type: CollectionModel,
            required: true
        },
        entity: {
            type: EntityModel,
            default: function () {
                return new EntityModel({
                    collection_id: this.collection.id
                });
            }
        },
        errors: {
            type: Object,
            default: function () {
                return {};
            }
        }
    },
    watch: {
        'errors': function (val) {
            if (!CommonHelper.isEmpty(val)) {
                this.$nextTick(() => {
                    this.changeLocale(Object.keys(val)[0]);

                    this.updateErrorsIndicatorByErrors();
                });
            }
        }
    },
    data() {
        return {
            isReady:       false,
            errorsIndicator: {},
            languages:     [],
            activeLocale:  '',
            status:        'inactive',
        }
    },
    mounted() {
        this.loadLanguages(() => {
            this.isReady = true;
            this.status = this.entity.status;
        });
    },
    methods: {
        /**
         * Loads and initializes compoment language models.
         *
         * @param {Function} [callback]
         */
        loadLanguages(callback) {
            this.$showLoader();

            ApiClient.Language.getList(1, 100).then((response) => {
                this.$hideLoader();

                this.languages = LanguageModel.getInstances(response.data);

                if (this.languages[0]) {
                    this.activeLocale = this.languages[0].locale;
                }

                if (CommonHelper.isFunction(callback)) {
                    callback(response);
                }
            }).catch((err) => {
                this.$hideLoader();

                this.$errResponseHandler(err);
            });
        },

        /**
         * Changes current active locale.
         *
         * @param {String} locale
         */
        changeLocale(locale) {
            for (let i in this.languages) {
                if (this.languages[i].locale == locale) {
                    this.activeLocale = locale;
                    break;
                }
            }
        },

        /**
         * Handles form field change event.
         *
         * @param {Object} field
         * @param {Object} data
         */
        onFieldChange(field, data) {
            this.$nextTick(() => {
                setTimeout(() => {
                    this.updateErrorsTrackerByFields();
                }, 0);
            });

            this.$emit('change', field, data, this.activeLocale);
        },

        /**
         * @param {Object} [errors]
         */
        updateErrorsIndicatorByErrors(errors) {
            errors = errors || this.errors;

            var locale = '';
            for (let i in this.languages) {
                locale = this.languages[i].locale;

                if (!CommonHelper.isEmpty(errors[locale])) {
                    this.$set(this.errorsIndicator, locale, true);
                } else {
                    this.$set(this.errorsIndicator, locale, false);
                }
            }
        },

        /**
         * @param {String} [locale]
         */
        updateErrorsTrackerByFields(locale) {
            locale = locale || this.activeLocale;

            var error = '';

            this.$set(this.errorsIndicator, locale, false);

            for (let i in this.$refs.fields) {
                error = this.$refs.fields[i].getError();
                if (error) {
                    this.$set(this.errorsIndicator, locale, true);
                    break;
                }
            }
        },

        /**
         * Handles form submission by resolving and normalizing fields data.
         */
        onSubmit() {
            var entityData = {data: {}};

            entityData.status        = this.status;
            entityData.collection_id = this.collection.id;

            // fields
            var fieldData, lang;
            for (let i in this.$refs.fields) {
                fieldData = this.$refs.fields[i].export();
                if (!CommonHelper.isObject(fieldData.data)) {
                    continue;
                }

                for (let j in this.languages) {
                    lang = this.languages[j];

                    if (!CommonHelper.isObject(entityData.data[lang.locale])) {
                        entityData.data[lang.locale] = {};
                    }

                    this.$set(entityData.data[lang.locale], fieldData.field, fieldData.data[lang.locale]);
                }
            }

            this.$emit('submit', entityData);
        }
    }
}
