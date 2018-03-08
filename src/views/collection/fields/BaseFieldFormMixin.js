import CommonHelper  from '@/utils/CommonHelper'
import {CFBaseModel} from '@/models/CFBaseModel'

export default {
    data() {
        return {
            isNew:          true,
            position:       0,
            autoSlugifyKey: true,
            formKey:        this.$randomKey(),
            field:          this.baseFieldData()
        }
    },
    watch: {
        'field.label': function (val) {
            if (this.autoSlugifyKey) {
                this.field.key = CommonHelper.slugify(val);
            }
        },
        'field.key': function (val) {
            this.field.key = CommonHelper.slugify(val);

            this.toggleAutoSlugify();
        },
        'isNew': function (val) {
            this.toggleAutoSlugify();
        }
    },
    methods: {
        /**
         * Toggles `field.key` auto slugify behaviour.
         */
        toggleAutoSlugify() {
            if (
                !this.isNew || // auto update only for new fields
                (this.field.key.length > 0 && this.field.key !== CommonHelper.slugify(this.field.label))
            ) {
                this.autoSlugifyKey = false;
            } else {
                this.autoSlugifyKey = true;
            }
        },

        /**
         * Returns field base data.
         *
         * @return {CFBaseModel}
         */
        baseFieldData() {
            return new CFBaseModel();
        },

        /**
         * Resets field data.
         */
        resetFieldData() {
            this.field = this.baseFieldData();
        },

        /**
         * Loads `fieldData` into the component field.
         *
         * @param {Object} fieldData
         */
        loadFieldData(fieldData = {}) {
            this.resetFieldData();

            this.field.load(fieldData);

            this.$emit('load', this.field);
        },

        /**
         * Shows and loads field form.
         *
         * @param {Object} fieldData
         */
        show(fieldData = {}) {
            this.loadFieldData(fieldData);

            this.$refs.formPopup.show();

            if (this.$refs.focusInput) {
                this.$nextTick(() => {
                    this.$refs.focusInput.focus();
                });
            }

            this.$emit('show', this.field);
        },

        /**
         * Hides field form.
         */
        hide() {
            this.$refs.formPopup.hide();

            this.$emit('hide', this.field);
        },

        /**
         * Field form submit event handler.
         */
        onSubmit() {
            this.$emit('submit', this.field);
        },

        /**
         * Field form cancel changes event handler.
         */
        onCancel() {
            this.$emit('cancel', this.field);
        },

        /**
         * Field form reset event handler.
         */
        onReset() {
            this.$emit('reset', this.field);

            this.resetFieldData();
        }
    }
}
