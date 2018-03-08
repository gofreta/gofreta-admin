<template>
    <form-field ref="field" class="form-group form-group-compact" :track="data[activeLocale]" :name="activeLocale + '.' + field.key">
        <label :for="uniqueId">
            <span class="txt v-align-top">{{ field.label }}</span>
            <small class="v-align-top" v-if="field.multilingual">({{activeLocale}})</small>
            <em class="v-align-top" v-if="field.required">*</em>
        </label>
        <flat-pickr
            v-model="data[activeLocale]"
            :id="uniqueId"
            :required="field.required"
            :config="dateConfig"
            @on-change="multilingualResolve"
        ></flat-pickr>
    </form-field>
</template>

<script>
import CommonHelper   from '@/utils/CommonHelper'
import BaseFieldMixin from './BaseFieldMixin'
import {MODE_DATE, MODE_DATETIME} from '@/models/CFDateModel'

// datepicker
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import 'flatpickr/dist/themes/airbnb.css';

const defaultDateConfig = {
    altInput:   true,
    enableTime: true,
    time_24hr:  true,
    dateFormat: 'U'
}

export default {
    mixins: [ BaseFieldMixin ],
    name: 'date-field',
    components: {
        'flat-pickr': flatPickr
    },
    computed: {
        dateConfig() {
            var mode   = CommonHelper.getNestedVal(this.field, 'meta.mode', MODE_DATETIME);
            var config = Object.assign({}, defaultDateConfig);

            if (mode == MODE_DATE) {
                config.enableTime = false;
                config.noCalendar = false;
                config.altFormat = 'Y-m-d';
            } else {
                config.enableTime = true;
                config.noCalendar = false;
                config.altFormat = 'Y-m-d H:i:S';
            }

            return config;
        }
    },
    methods: {
        /**
         * @inheritdoc
         */
        initData() {
            var val, lang;

            for (let i in this.languages) {
                lang = this.languages[i];
                val = this.entity.getFieldValue(this.field.key, lang.locale, 0);

                if (val << 0 > 0) {
                    this.$set(this.data, lang.locale, '' + val); // cast to string
                }
            }
        }
    }
};
</script>
