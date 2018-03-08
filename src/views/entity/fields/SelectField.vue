<template>
    <form-field ref="field" class="form-group form-group-compact" :track="data[activeLocale]" :name="activeLocale + '.' + field.key">
        <label :for="uniqueId">
            <span class="txt v-align-top">{{ field.label }}</span>
            <small class="v-align-top" v-if="field.multilingual">({{activeLocale}})</small>
            <em class="v-align-top" v-if="field.required">*</em>
        </label>

        <select
            v-model="data[activeLocale]"
            :id="uniqueId"
            :required="field.required"
            @change="multilingualResolve"
        >
            <option :value="option.value" v-for="option in field.meta.options">
                {{ option.name }}
            </option>
        </select>
    </form-field>
</template>

<script>
import BaseFieldMixin from './BaseFieldMixin'

export default {
    mixins: [ BaseFieldMixin ],
    name: 'select-field'
};
</script>
