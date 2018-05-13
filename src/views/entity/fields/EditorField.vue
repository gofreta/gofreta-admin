<template>
    <form-field
        ref="field"
        class="form-group"
        :class="field.meta.mode == 'rich' ? 'form-group-editor' : 'form-group-compact'"
        :track="data[activeLocale]"
        :name="activeLocale + '.' + field.key"
    >
        <label class="txt-hint" :for="uniqueId">
            <span class="txt v-align-top">{{ field.label }}</span>
            <small class="v-align-top" v-if="field.multilingual">({{activeLocale}})</small>
            <em class="v-align-top" v-if="field.required">*</em>
        </label>

        <rich-editor
            v-if="field.meta.mode == 'rich'"
            v-model="data[activeLocale]"
            @change="multilingualResolve"
        ></rich-editor>

        <textarea
            v-else
            v-model="data[activeLocale]"
            :id="uniqueId"
            :required="field.required"
            @change="multilingualResolve"
        ></textarea>
    </form-field>
</template>

<script>
import BaseFieldMixin from './BaseFieldMixin'

export default {
    mixins: [ BaseFieldMixin ],
    name: 'editor-field'
};
</script>
