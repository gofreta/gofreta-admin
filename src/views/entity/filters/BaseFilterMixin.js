import CommonHelper from '@/utils/CommonHelper'

export default {
    props: {
        name: {
            type:     String,
            required: true
        }
    },
    data() {
        return {
            value: ''
        }
    },
    methods: {
        /**
         * Resolves and returns filter data.
         *
         * @return {Object}
         */
        export() {
            var result = {};

            if (!CommonHelper.isEmpty(this.value)) {
                result[this.name] = this.value;
            }

            return result;
        },

        /**
         * Resets filter value.
         */
        reset() {
            this.value = '';
        },

        /**
         * Handles and propagate filter field's change event.
         */
        onChange() {
            this.$emit('change', this.export());
        }
    }
}
