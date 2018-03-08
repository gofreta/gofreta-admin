<template>
    <div>
        <popup title="Dropdown Field" ref="formPopup">
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

                <div class="block">
                    <label class="txt-hint m-b-10">Dropdown options</label>
                    <table class="table table-bordered table-compact v-align-middle">
                        <thead>
                            <tr>
                                <th>Option Value</th>
                                <th>Option Text</th>
                                <th v-if="field.meta.options && field.meta.options.length > 1"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(option, index) in field.meta.options">
                                <td>
                                    <div class="form-group form-group-sm m-b-0">
                                        <input type="text" v-model="option.value" required>
                                    </div>
                                </td>
                                <td>
                                    <div class="form-group form-group-sm m-b-0">
                                        <input type="text" v-model="option.name" required>
                                    </div>
                                </td>
                                <td v-if="field.meta.options.length > 1">
                                    <span class="ctrl cursor-pointer link-danger" @click.prevent="removeOption(index)"><i class="di di-trash"></i></span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="block m-t-10 txt-right">
                        <button type="button" class="btn btn-primary btn-sm" @click="newOptionRow()">Add Option</button>
                    </div>
                </div>

                <hr>

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
import {CFSelectModel}    from '@/models/CFSelectModel'

export default {
    mixins: [ BaseFieldFormMixin ],
    name: 'select-form',
    created() {
        // nested reactivity fix
        this.$on('load', (field) =>  {
            this.field.meta.options = field.meta.options || [];

            this.metaReload()
        });
        this.$on('show', (field) =>  {
            if (!field.meta.options || !field.meta.options.length) {
                this.newOptionRow('My option 1', '1');
            }
        });
    },
    methods: {
        /**
         * @inheritdoc
         */
        baseFieldData() {
            return new CFSelectModel();
        },

        /**
         * Field meta reactivity fix.
         */
        metaReload() {
            this.field.meta = Object.assign({}, this.field.meta);
        },

        /**
         * Adds new option item.
         *
         * @param {String} name
         * @param {String} value
         */
        newOptionRow(name = '', value = '') {
            this.field.addOption(name, value);

            this.metaReload();
        },

        /**
         * Removes single option item by its index.
         *
         * @param {Number} index
         */
        removeOption(index) {
            this.field.removeOption(index);

            this.metaReload();
        }
    }
};
</script>
