<template>
    <div>
        <div class="block" v-if="!isReady">
            <span class="icon loader-icon txt-dark-grey active"><i class="di di-loading"></i></span>
        </div>

        <template v-else>
            <div class="row">
                <div class="cols-8">
                    <div class="tabs">
                        <div class="tabs-header">
                            <div class="tab-item"
                                v-for="lang in languages"
                                :class="{
                                    'active': activeLocale === lang.locale,
                                    'txt-danger': errorsIndicator[lang.locale] === true
                               }"
                                @click.prevent="changeLocale(lang.locale)"
                            >
                                <span class="txt">{{ lang.title }}</span>
                                <small>({{ lang.locale }})</small>

                                <i v-if="errorsIndicator[lang.locale] === true" class="di di-warning m-l-5"></i>
                            </div>
                        </div>

                        <div class="panel tab-panel p-small">
                            <template v-for="(field, index) in collection.fields">
                                <plain-field
                                    v-if="field.type === 'plain'"
                                    ref="fields"
                                    :field="field"
                                    :languages="languages"
                                    :activeLocale="activeLocale"
                                    :entity="entity"
                                    @change="onFieldChange"
                                ></plain-field>

                                <editor-field
                                    v-else-if="field.type === 'editor'"
                                    ref="fields"
                                    :field="field"
                                    :languages="languages"
                                    :activeLocale="activeLocale"
                                    :entity="entity"
                                    @change="onFieldChange"
                                ></editor-field>

                                <date-field
                                    v-else-if="field.type === 'date'"
                                    ref="fields"
                                    :field="field"
                                    :languages="languages"
                                    :activeLocale="activeLocale"
                                    :entity="entity"
                                    @change="onFieldChange"
                                ></date-field>

                                <switch-field
                                    v-else-if="field.type === 'switch'"
                                    ref="fields"
                                    :field="field"
                                    :languages="languages"
                                    :activeLocale="activeLocale"
                                    :entity="entity"
                                    @change="onFieldChange"
                                ></switch-field>

                                <checklist-field
                                    v-else-if="field.type === 'checklist'"
                                    ref="fields"
                                    :field="field"
                                    :languages="languages"
                                    :activeLocale="activeLocale"
                                    :entity="entity"
                                    @change="onFieldChange"
                                ></checklist-field>

                                <select-field
                                    v-else-if="field.type === 'select'"
                                    ref="fields"
                                    :field="field"
                                    :languages="languages"
                                    :activeLocale="activeLocale"
                                    :entity="entity"
                                    @change="onFieldChange"
                                ></select-field>

                                <media-field
                                    v-else-if="field.type === 'media'"
                                    ref="fields"
                                    :field="field"
                                    :languages="languages"
                                    :activeLocale="activeLocale"
                                    :entity="entity"
                                    @change="onFieldChange"
                                ></media-field>

                                <relation-field
                                    v-else-if="field.type === 'relation'"
                                    ref="fields"
                                    :field="field"
                                    :languages="languages"
                                    :activeLocale="activeLocale"
                                    :entity="entity"
                                    @change="onFieldChange"
                                ></relation-field>
                            </template>
                        </div>
                    </div>
                </div>

                <div class="cols-4">
                    <div class="panel">
                        <div class="panel-header bg-light-grey">
                            <h6>Settings</h6>
                        </div>

                        <div class="block p-small">
                            <div class="form-group form-group-switch form-group-color-success">
                                <input type="checkbox" id="model_status" v-model="status" true-value="active" false-value="inactive">
                                <label for="model_status">Public Status <span class="txt-hint">({{ status == 'active' ? 'Active' : 'Inactive' }})</span></label>
                            </div>

                            <hr>

                            <div class="block">
                                <router-link :to="{name: 'entity-index', params: {cid: collection.name}}" class="link-dark-grey float-left m-t-5">
                                    Cancel
                                </router-link>
                                <button class="btn btn-cons btn-success float-right" @click="onSubmit">
                                    <span class="txt" v-if="entity.id === null">Create</span>
                                    <span class="txt" v-else>Update</span>
                                </button>
                                <div class="clearfix"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script src="./form.component.js"></script>
