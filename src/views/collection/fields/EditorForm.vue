<template>
    <div>
        <popup title="Textarea Editor Field" ref="formPopup">
            <form class="block" @submit.prevent="onSubmit" @reset="onReset">
                <div class="row">
                    <div class="cols-6">
                        <div class="form-group form-group-compact">
                            <label :for="'field_label_' + formKey">Label <em>*</em></label>
                            <input type="text" v-model="field.label" :id="'field_label_' + formKey" required ref="focusInput">
                        </div>
                    </div>
                    <div class="cols-6">
                        <div class="form-group form-group-compact">
                            <label :for="'field_api_key_' + formKey">Api Key <em>*</em></label>
                            <input type="text" v-model="field.key" :id="'field_api_key_' + formKey" required>
                        </div>
                    </div>
                </div>

                <div class="form-group form-group-compact">
                    <label :for="'field_editor_type_' + formKey">Editor Type <em>*</em></label>
                    <select v-model="field.meta.mode" :id="'field_editor_type_' + formKey" required>
                        <option :value="value" v-for="(name, value) in editorModes">{{ name }}</option>
                    </select>
                </div>

                <div class="form-group form-group-compact">
                    <label :for="'field_default_val_' + formKey">Default Value</label>
                    <input type="text" v-model="field.default" :id="'field_default_val_' + formKey">
                </div>

                <div class="row">
                    <div class="cols-4">
                        <div class="form-group form-group-switch form-group-color-success">
                            <input type="checkbox" v-model="field.multilingual" :id="'field_is_multilingual_' + formKey">
                            <label :for="'field_is_multilingual_' + formKey">Multilingual</label>
                        </div>
                    </div>
                    <div class="cols-4">
                        <div class="form-group form-group-switch form-group-color-success">
                            <input type="checkbox" v-model="field.required" :id="'field_is_required_' + formKey">
                            <label :for="'field_is_required_' + formKey">Required</label>
                        </div>
                    </div>
                    <div class="cols-4">
                        <div class="form-group form-group-switch form-group-color-success">
                            <input type="checkbox" v-model="field.unique" :id="'field_is_unique_' + formKey">
                            <label :for="'field_is_unique_' + formKey">Unique</label>
                        </div>
                    </div>
                </div>

                <hr class="m-t-0">

                <div class="block">
                    <button @click="onCancel" type="button" class="btn btn-cons-sm btn-dark-grey float-left">Cancel</button>

                    <button class="btn btn-cons-sm btn-success float-right">
                        <span class="txt" v-if="isNew">Add</span>
                        <span class="txt" v-else>Save</span>
                    </button>
                </div>
            </form>
        </popup>
    </div>
</template>

<script>
import BaseFieldFormMixin from './BaseFieldFormMixin'
import {MODE_RICH, MODE_SIMPLE, CFEditorModel} from '@/models/CFEditorModel'

const modes        = {};
modes[MODE_SIMPLE] = 'Simple Textarea';
modes[MODE_RICH]   = 'Rich Text Editor (TinyMCE)';

export default {
    mixins: [ BaseFieldFormMixin ],
    name: 'editor-form',
    data() {
        return {
            editorModes: modes
        }
    },
    methods: {
        /**
         * @inheritdoc
         */
        baseFieldData() {
            return new CFEditorModel();
        }
    }
};
</script>
