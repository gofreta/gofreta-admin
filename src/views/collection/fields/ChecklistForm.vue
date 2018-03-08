<template>
    <div>
        <popup title="Checkoptions Field" ref="formPopup">
            <form class="block" @submit.prevent="onSubmit" @reset="onReset">
                <div class="row">
                    <div class="cols-6">
                        <div class="form-group form-group-compact">
                            <label ref="focusInput" :for="'field_label_' + formKey">Label <em>*</em></label>
                            <input type="text" v-model="field.label" :id="'field_label_' + formKey" required>
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

                <div class="block">
                    <label class="txt-hint m-b-10">Checkoptions items</label>
                    <table class="table table-bordered table-compact v-align-middle">
                        <thead>
                            <tr>
                                <th>Value</th>
                                <th>Label</th>
                                <th v-if="field.meta.options && field.meta.options.length > 1"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in field.meta.options">
                                <td>
                                    <div class="form-group form-group-sm m-b-0">
                                        <input type="text" v-model="item.value" required>
                                    </div>
                                </td>
                                <td>
                                    <div class="form-group form-group-sm m-b-0">
                                        <input type="text" v-model="item.name" required>
                                    </div>
                                </td>
                                <td class="txt-center" v-if="field.meta.options.length > 1">
                                    <span class="ctrl cursor-pointer link-danger" @click.prevent="removeOption(index)"><i class="di di-trash"></i></span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="block m-t-10 txt-right">
                        <button type="button" class="btn btn-primary btn-sm" @click="newListRow()">Add Option</button>
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
import {CFChecklistModel} from '@/models/CFChecklistModel'

export default {
    mixins: [ BaseFieldFormMixin ],
    name: 'checklist-form',
    created() {
        // nested reactivity fix
        this.$on('load', (field) =>  {
            this.optionsLoad(field.meta.options)
        });
        this.$on('show', (field) =>  {
            if (!field.meta.options || !field.meta.options.length) {
                this.newListRow({
                    'value': '1',
                    'name': 'Sample options item 1',
                });
            }
        });
    },
    methods: {
        /**
         * @inheritdoc
         */
        baseFieldData() {
            return new CFChecklistModel();
        },

        /**
         * Load `options` into the field meta.
         *
         * @param {Array} options
         */
        optionsLoad(options) {
            // nested reactivity fix
            this.field.meta = Object.assign({}, this.field.meta, {
                'options': options || []
            });
        },

        /**
         * Adds new option item.
         *
         * @param {Object} optionsItem
         */
        newListRow(optionsItem) {
            var options = this.field.meta.options || [];

            optionsItem = optionsItem || { 'name': '', 'value': '' };

            options.push(optionsItem);

            this.optionsLoad(options);
        },

        /**
         * Removes option item by its index.
         *
         * @param {Number} index
         */
        removeOption(index) {
            var options = this.field.meta.options || [];

            options.splice(index, 1);

            this.optionsLoad(options);
        }
    }
};
</script>
