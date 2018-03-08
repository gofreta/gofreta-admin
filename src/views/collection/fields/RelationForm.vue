<template>
    <div>
        <popup title="Relationship Field" ref="formPopup">
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

                <div class="row">
                    <div class="cols-6">
                        <div class="form-group form-group-compact">
                            <label :for="'field_collection_' + formKey">Collection <em>*</em></label>
                            <select v-model="field.meta.collection_id" :id="'field_collection_' + formKey" required>
                                <option :value="collection.id" v-for="collection in collections">{{ collection.title }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="cols-6">
                        <div class="form-group form-group-compact">
                            <label :for="'field_max_rels_' + formKey">Max Relations</label>
                            <input type="number" v-model.number="field.meta.max" :id="'field_max_rels_' + formKey" min="0" placeholder="Leave empty for no limit">
                        </div>
                    </div>
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
import ApiClient           from '@/utils/ApiClient'
import BaseFieldFormMixin  from './BaseFieldFormMixin'
import { CFRelationModel } from '@/models/CFRelationModel'

export default {
    mixins: [ BaseFieldFormMixin ],
    name: 'relation-form',
    data() {
        return {
            collections: []
        }
    },
    mounted() {
        // nested reactivity fix
        this.$on('load', (field) =>  {
            this.loadCollectionsList();
        });
    },
    methods: {
        /**
         * @inheritdoc
         */
        baseFieldData() {
            return new CFRelationModel();
        },

        /**
         * Loads and initializes relation items list.
         */
        loadCollectionsList() {
            this.$showLoader();

            ApiClient.Collection.getList(1, 99).then((response) => {
                this.$hideLoader();

                this.collections = response.data;

                if (this.collections.length > 0 && !this.field.meta.collection_id) {
                    this.field.meta.collection_id = this.collections[0].id;
                }
            }).catch((err) => {
                this.$hideLoader();

                this.$errResponseHandler(err);
            });
        }
    }
};
</script>
