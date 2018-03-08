import CommonHelper      from '@/utils/CommonHelper'
import PlainForm         from './fields/PlainForm'
import EditorForm        from './fields/EditorForm'
import SelectForm        from './fields/SelectForm'
import DateForm          from './fields/DateForm'
import SwitchForm        from './fields/SwitchForm'
import ChecklistForm     from './fields/ChecklistForm'
import MediaForm         from './fields/MediaForm'
import RelationForm      from './fields/RelationForm'
import {CollectionModel} from '@/models/CollectionModel'

const SCENARIO_CREATE = 'create';
const SCENARIO_UPDATE = 'update';

export default {
    name: 'collection-form',
    props: {
        scenario: {
            type:    String,
            default: SCENARIO_CREATE
        },
        errors: {
            type: Object,
            default: function () {
                return {};
            }
        }
    },
    components: {
        'plain-form':     PlainForm,
        'editor-form':    EditorForm,
        'select-form':    SelectForm,
        'date-form':      DateForm,
        'switch-form':    SwitchForm,
        'checklist-form': ChecklistForm,
        'media-form':     MediaForm,
        'relation-form':  RelationForm
    },
    data() {
        return {
            collection: new CollectionModel(),
            autoSlugifyName: true,
            advanced: false,
            activeFieldErrorsInfo: {},
            fieldTypes: {
                'plain': {
                    'icon':  'di-pencil',
                    'title': 'Plain Text',
                    'form':  'plainFieldForm'
                },
                'editor': {
                    'icon':  'di-document',
                    'title': 'Textarea Editor',
                    'form':  'editorFieldForm'
                },
                'select': {
                    'icon':  'di-view-list',
                    'title': 'Dropdown',
                    'form':  'selectFieldForm'
                },
                'date': {
                    'icon':  'di-calendar',
                    'title': 'Date and Time',
                    'form':  'dateFieldForm'
                },
                'switch': {
                    'icon':  'di-scale',
                    'title': 'Switch',
                    'form':  'switchFieldForm'
                },
                'checklist': {
                    'icon':  'di-checklist',
                    'title': 'Check List',
                    'form':  'checklistFieldForm'
                },
                'media': {
                    'icon':  'di-photo-group',
                    'title': 'Media picker',
                    'form':  'mediaFieldForm'
                },
                'relation': {
                    'icon':  'di-network-1',
                    'title': 'Relationship',
                    'form':  'relationFieldForm'
                }
            }
        }
    },
    watch: {
        'collection.title': function (val) {
            if (this.autoSlugifyName) {
                this.collection.name = CommonHelper.slugify(val);
            }

            if (this.scenario === SCENARIO_UPDATE && val.length) {
                this.$setDocumentTitle(val + ' - Settings');
            }
        },
        'collection.name': function (val) {
            this.collection.name = CommonHelper.slugify(val);

            // auto update only on create
            if (this.scenario === SCENARIO_CREATE) {
                if (
                    this.collection.name.length > 0 &&
                    this.collection.name !== CommonHelper.slugify(this.collection.title)
                ) {
                    this.autoSlugifyName = false;
                } else {
                    this.autoSlugifyName = true;
                }
            }
        },
        'errors': function (val) {
            if (this.$refs.fieldsAlert && !CommonHelper.isEmpty(val) && CommonHelper.isObject(val)) {
                this.$nextTick(() => {
                    this.$refs.fieldsAlert.show();
                });
            }
        }
    },
    mounted() {
        if (this.scenario === SCENARIO_UPDATE) {
            this.autoSlugifyName = false;
        }
    },
    methods: {
        // Drag and drop handlers
        // -----------------------------------------------------------
        /**
         * Vddl moved event handler.
         *
         * @param {Object} data
         */
        handleMoved(data) {
            // overwrite the default vddl handler
        },

        /**
         * Vddl drop event handler.
         *
         * @param {Object} evt
         */
        handleDrop(evt) {
            const { index, list, item } = evt;
            const { field, position, isNew } = item;

            // sort...
            if (!isNew) {
                list.splice(index, 0, field);

                this.$nextTick(() => {
                    if (index < position) {
                        list.splice(position + 1, 1);
                    } else {
                        list.splice(position, 1);
                    }
                });

                this.resetFieldsAlert();

                return;
            }

            // clone/drop from fields panel...
            var formRef = this.getFormRefByType(item.type);
            if (!formRef) {
                return false;
            }

            formRef.position = index;
            formRef.isNew    = true;
            formRef.show();

            return true;
        },

        // Field forms
        // -----------------------------------------------------------
        /**
         * Returns single field form component by its type.
         *
         * @param {String} fieldType
         */
        getFormRefByType(fieldType) {
            var form = this.fieldTypes[fieldType] ? this.fieldTypes[fieldType].form : '';

            return this.$refs[form];
        },

        /**
         * Handles field form submission.
         *
         * @param {Object} field
         */
        onFieldFormSubmit(field) {
            var formRef = this.getFormRefByType(field.type);
            if (!formRef) {
                console.warn('Missing form reference for type ' + field.type);
                return;
            }

            if (formRef.isNew) {
                this.collection.fields.splice(formRef.position, 0, field);
            } else {
                this.$set(this.collection.fields, formRef.position, field);
            }

            this.collection.fixDuplicatedFieldKeys();

            formRef.hide();
        },

        /**
         * Handles field form cancellation.
         *
         * @param {Object} field
         */
        onFieldFormCancel(field) {
            var formRef = this.getFormRefByType(field.type);
            if (!formRef) {
                console.warn('Missing form reference for type ' + field.type);
                return;
            }

            formRef.hide();
        },

        /**
         * Prepares and load field form for update.
         *
         * @param {Number} index Index of the field to update.
         */
        editField(index) {
            var field = this.collection.fields[index];
            if (!field) {
                console.warn('Missing collection field with index ' + index);
                return;
            }

            var formRef = this.getFormRefByType(field.type);
            if (!formRef) {
                console.warn('Missing form reference for type ' + field.type);
                return;
            }

            formRef.position = index;
            formRef.isNew    = false;
            formRef.show(field);
        },

        /**
         * Removes single field by its index.
         *
         * @param {Number} index
         */
        removeField(index) {
            var field = this.collection.fields[index];
            if (!field) {
                console.warn('Missing collection field with index ' + index);
                return;
            }

            if (window.confirm('Are you sure you want to remove the field?')) {
                this.collection.removeFieldByKey(field.key);

                this.resetFieldsAlert();
            }
        },

        // Collection data handlers
        // -----------------------------------------------------------
        /**
         * Toggles advanced settings flag.
         */
        toggleAdvanced() {
            if (this.advanced) {
                this.advanced = false;
            } else {
                this.advanced = true;
            }
        },

        /**
         * Toggles single field error detailed info box.
         *
         * @param {Number} index The index of the error data.
         */
        toggleFieldErrorInfo(index) {
            if (this.activeFieldErrorsInfo[index]) {
                this.$set(this.activeFieldErrorsInfo, index, false);
            } else {
                this.$set(this.activeFieldErrorsInfo, index, true);
            }
        },

        /**
         * Clears all fields errors.
         */
        resetFieldsAlert() {
            if (this.$refs.fieldsAlert) {
                this.$refs.fieldsAlert.hide();
            }
        },

        /**
         * Handles form component submission.
         */
        onSubmit() {
            this.$emit('submit', this.collection.export());
        }
    }
}
