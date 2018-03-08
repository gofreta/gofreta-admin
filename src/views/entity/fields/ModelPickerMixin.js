import CommonHelper   from '@/utils/CommonHelper'
import BaseFieldMixin from './BaseFieldMixin'

var activeItemIndex = -1;

export default {
    mixins: [ BaseFieldMixin ],
    computed: {
        enableNewPick() {
            return (
                !this.field.meta.max ||
                (this.data[this.activeLocale] && this.data[this.activeLocale].length < this.field.meta.max)
            );
        }
    },
    methods: {
        /**
         * @inheritdoc
         */
        export() {
            var result = {'field': this.field.key, 'data': {}};

            for (let locale in this.data) {
                result.data[locale] = [];

                for (let i in this.data[locale]) {
                    if (this.data[locale][i].id) {
                        result.data[locale].push(this.data[locale][i].id);
                    }
                }
            }

            return result;
        },

        /**
         * @inheritdoc
         */
        initData() {
            for (let i in this.languages) {
                let lang = this.languages[i];

                this.$set(this.data, lang.locale, []);

                this.loadFromEntity(lang.locale);
            }
        },

        /**
         * Loads picker items from the initialized entity data.
         *
         * @param {String} locale
         */
        loadFromEntity(locale = '') {
            locale = locale || this.activeLocale;

            var items = this.entity.getFieldValue(this.field.key, locale, []).slice(0);

            for (let i in items) {
                if (CommonHelper.isObject(items[i])) {
                    this.$set(this.data[locale], i, items[i]);
                }
            }
        },

        /**
         * Removes single selected picker item.
         *
         * @param {Number} index
         * @param {String} [locale]
         */
        deleteItem(index, locale = '') {
            locale = locale || this.activeLocale;

            this.$delete(this.data[locale], index);

            this.multilingualResolve();
        },

        /**
         * Opens new picker modal and marks the provided index item for replacement.
         *
         * @param {Number} index
         */
        editItem(index) {
            activeItemIndex = index;

            this.openPicker();
        },

        /**
         * Opens picker modal.
         */
        openPicker() {
            if (CommonHelper.isFunction(this.$refs.picker.show)) {
                this.$refs.picker.show();
            }
        },

        /**
         * Closes picker modal.
         */
        closePicker() {
            activeItemIndex = -1;

            if (CommonHelper.isFunction(this.$refs.picker.hide)) {
                this.$refs.picker.hide();
            }
        },

        /**
         * Handles close picker modal event.
         */
        onPickerHide() {
            activeItemIndex = -1;
        },

        /**
         * Processes the selected picker item.
         *
         * @param {Object} item
         * @param {String} [locale]
         */
        onItemSelect(item, locale = '') {
            locale = locale || this.activeLocale;

            if (activeItemIndex >= 0) {
                this.$set(this.data[locale], activeItemIndex, item);

                activeItemIndex = -1;
            } else {
                this.data[locale].push(item);
            }

            this.multilingualResolve();

            this.closePicker();
        }
    }
}
