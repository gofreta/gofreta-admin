import List from './List'

/**
 * Entities picker component.
 *
 * @example
 * ```html
 * <entities-picker ref="picker" :cid="cid"></entities-picker>
 * ```
 *
 * @author Gani Georgiev <gani.georgiev@gmail.com>
 */
export default {
    name: 'entities-picker',
    components: {
        'entities-list': List
    },
    props: {
        cid: {
            type: String,
            required: true
        }
    },
    methods: {
        onItemSelect(item) {
            this.$emit('select', item.export());
        },
        show() {
            this.$refs.entitiesList.init();

            this.$refs.pickerPopup.show();

            this.$emit('show');
        },
        hide() {
            this.$refs.pickerPopup.hide();

            this.$emit('hide');
        },
    }
}
