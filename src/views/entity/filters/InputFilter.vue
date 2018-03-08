<template>
    <div class="form-group form-group-sm m-0">
        <input type="text" v-model="value" @input="onChange">
    </div>
</template>

<script>
import CommonHelper   from '@/utils/CommonHelper'
import BaseFilterMixin from './BaseFilterMixin';

export default {
    mixins: [ BaseFilterMixin ],
    name: 'input-filter',
    props: {
        raw: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        /**
         * @inheritdoc
         */
        export() {
            var result = {};

            if (!CommonHelper.isEmpty(this.value)) {
                if (this.raw) {
                    result[this.name] = this.value;
                } else {
                    result[this.name] = '~' + this.value + '~';
                }
            }

            return result;
        }
    }
}
</script>
