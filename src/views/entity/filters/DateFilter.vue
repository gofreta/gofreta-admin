<template>
    <div class="form-group form-group-sm m-0">
        <flat-pickr
            v-model="value"
            :config="dateConfig"
            @on-close="onChange"
        ></flat-pickr>
    </div>
</template>

<script>
import CommonHelper   from '@/utils/CommonHelper'
import BaseFilterMixin from './BaseFilterMixin';

// datepicker
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import 'flatpickr/dist/themes/airbnb.css';

const baseDateConfig = {
    mode:       'range',
    altFormat:  'Y-m-d H:i:S',
    altInput:   true,
    enableTime: true,
    dateFormat: 'U'
}

export default {
    mixins: [ BaseFilterMixin ],
    name: 'date-filter',
    components: {
        'flat-pickr': flatPickr
    },
    data() {
        return {
            dateConfig: Object.assign({}, baseDateConfig)
        }
    },
    methods: {
        /**
         * @inheritdoc
         */
        export() {
            var result = {};

            if (!CommonHelper.isEmpty(this.value)) {
                var parts  = this.value.split(' to ');
                if (parts.length == 2) {
                    result[this.name] = ('[' + parts[0] + ',' + parts[1] + ']');
                }
            }

            return result;
        }
    }
}
</script>
