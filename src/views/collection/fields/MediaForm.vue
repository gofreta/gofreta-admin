<template>
    <div>
        <popup title="Media Field" ref="formPopup">
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
                    <label :for="'field_max_files_' + formKey">Max Files</label>
                    <input type="number" v-model.number="field.meta.max" :id="'field_max_files_' + formKey">
                </div>

                <div class="row">
                    <div class="cols-6">
                        <div class="form-group form-group-switch form-group-color-success">
                            <input type="checkbox" v-model="field.multilingual" :id="'field_is_multilingual_' + formKey">
                            <label :for="'field_is_multilingual_' + formKey">Multilingual</label>
                        </div>
                    </div>
                    <div class="cols-6">
                        <div class="form-group form-group-switch form-group-color-success">
                            <input type="checkbox" v-model="field.required" :id="'field_is_required_' + formKey">
                            <label :for="'field_is_required_' + formKey">Required</label>
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
import { CFMediaModel }   from '@/models/CFMediaModel'

export default {
    mixins: [ BaseFieldFormMixin ],
    name: 'media-form',
    methods: {
        /**
         * @inheritdoc
         */
        baseFieldData() {
            return new CFMediaModel();
        }
    }
};
</script>
