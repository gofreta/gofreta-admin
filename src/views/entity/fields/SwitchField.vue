<template>
    <form-field ref="field" class="form-group form-group-switch form-group-color-primary" :track="data[activeLocale]" :name="activeLocale + '.' + field.key">
        <input type="checkbox"
            v-model="data[activeLocale]"
            :id="uniqueId"
            :required="field.required"
            @change="multilingualResolve"
        >
        <label :for="uniqueId">
            <span class="txt v-align-top">{{ field.label }}</span>
            <small class="v-align-top" v-if="field.multilingual">({{activeLocale}})</small>
            <!-- <em class="v-align-top" v-if="field.required">*</em> -->
        </label>
    </form-field>
</template>

<script>
import BaseFieldMixin from './BaseFieldMixin'

export default {
    mixins: [ BaseFieldMixin ],
    name: 'switch-field'
};
</script>
