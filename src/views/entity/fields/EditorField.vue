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

        <quill-editor
            v-if="field.meta.mode == 'rich'"
            v-model="data[activeLocale]"
            class="rich-editor"
            :id="uniqueId"
            :options="editorConfig"
            @change="multilingualResolve"
        >
        </quill-editor>

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

// editor
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'

const editorConfig = {
    modules: {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['link', 'image'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'align': [] }],
            [{ 'script': 'sub'}, { 'script': 'super' }],
            ['blockquote', 'code-block'],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],
        ]
    }
};

export default {
    mixins: [ BaseFieldMixin ],
    name: 'editor-field',
    components: {
        'quill-editor': quillEditor
    },
    data() {
        return {
            editorConfig: Object.assign({}, editorConfig)
        }
    }
};
</script>
