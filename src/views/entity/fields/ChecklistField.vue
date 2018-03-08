<template>
    <form-field ref="field" class="form-group form-group-color-primary" :track="data[activeLocale]" :name="activeLocale + '.' + field.key">
        <label class="txt-hint m-b-10">
            <span class="txt v-align-top">{{ field.label }}</span>
            <small class="v-align-top" v-if="field.multilingual">({{activeLocale}})</small>
            <em class="v-align-top" v-if="field.required">*</em>
        </label>

        <template v-if="field.meta && field.meta.options">
            <div class="list-item m-b-5" v-for="(item, index) in field.meta.options" :key="index">
                <input
                    type="checkbox"
                    v-model="data[activeLocale]"
                    :id="uniqueId + index"
                    :value="item.value + ''"
                    @change="multilingualResolve"
                >

                <label class="" :for="uniqueId + index">{{ item.name }}</label>
            </div>
        </template>
    </form-field>
</template>

<script>
import CommonHelper   from '@/utils/CommonHelper'
import BaseFieldMixin from './BaseFieldMixin'

export default {
    mixins: [ BaseFieldMixin ],
    name: 'checklist-field',
    methods: {
        /**
         * @inheritdoc
         */
        initData() {
            if (this.field.default && !CommonHelper.isArray(this.field.default)) {
                this.field.default = [this.field.default]
            }

            var lang, fieldValue;

            for (let i in this.languages) {
                lang       = this.languages[i];
                fieldValue = this.entity.getFieldValue(this.field.key, lang.locale, this.field.default);

                if (!CommonHelper.isArray(fieldValue)) {
                    if (CommonHelper.isEmpty(fieldValue)) {
                        fieldValue = [];
                    } else {
                        fieldValue = [fieldValue];
                    }
                }

                this.$set(this.data, lang.locale, fieldValue);
            }
        },
    }
};
</script>
