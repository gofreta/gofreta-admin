<template>
    <div>
        <div class="row">
            <div class="cols-4">
                <div class="panel">
                    <div class="panel-header bg-light-grey">
                        <h6>Fields</h6>
                    </div>

                    <div class="fields-panel">
                        <vddl-draggable class="icon-box"
                            v-for="(meta, type) in fieldTypes"
                            :key="type"
                            :draggable="{ 'isNew': true, 'type': type }"
                            effect-allowed="copy"
                        >
                            <div class="box-icon"><i class="di" :class="meta.icon"></i></div>
                            <div class="box-name">{{ meta.title }}</div>
                        </vddl-draggable>
                    </div>
                </div>
            </div>

            <div class="cols-8">
                <form @submit.prevent="onSubmit">
                    <div class="row">
                        <div class="cols-6">
                            <form-field class="form-group form-group-compact m-t-5 m-b-base" :track="collection.title" name="title">
                                <label for="collection_title">Collection Title <em>*</em></label>
                                <input type="text" v-model="collection.title" id="collection_title">
                            </form-field>
                        </div>
                        <div class="cols-6">
                            <form-field class="form-group form-group-compact m-t-5 m-b-base" :track="collection.name" name="name">
                                <label for="collection_name">Collection Name <em>*</em></label>
                                <input type="text" v-model="collection.name" id="collection_name">
                            </form-field>
                        </div>
                    </div>

                    <alert class="alert-danger" ref="fieldsAlert" v-if="errors.fields">
                        <div class="content">
                            <p v-if="typeof errors.fields == 'string'">Fields: {{ errors.fields }}</p>

                            <template v-else>
                                <p v-for="(errors, index) in errors.fields" v-if="collection.fields[index]">
                                    Field <strong>{{ collection.fields[index].label || collection.fields[index].key || index }}</strong> is invalid
                                    <small class="default-link" @click="toggleFieldErrorInfo(index)">(&nbsp;Learn more&nbsp;)</small>.

                                    <small class="block p-5 panel no-shadow no-border txt-hint" v-show="activeFieldErrorsInfo[index]">
                                        <div v-for="(message, attr) in errors">
                                            <strong>{{ attr }}</strong>
                                            <span class="txt">{{ message }}</span>
                                        </div>
                                    </small>
                                </p>
                            </template>
                        </div>
                    </alert>

                    <vddl-list class="sortable-list"
                        :class="{ 'empty': !collection.fields.length }"
                        :list="collection.fields"
                        :drop="handleDrop"
                        :horizontal="false"
                    >
                        <vddl-draggable class="sortable-item"
                            v-for="(field, index) in collection.fields"
                            :key="field.key + $randomKey()"
                            :draggable="{'field': field, 'position': index}"
                            :index="index"
                            :wrapper="collection.fields"
                            :moved="handleMoved"
                            effect-allowed="move"
                        >
                            <div class="sortable-item-elem icon" v-if="fieldTypes[field.type]"><i class="di" :class="fieldTypes[field.type].icon"></i></div>
                            <div class="sortable-item-elem title">
                                <span class="txt">{{ field.label }}</span>
                                <span class="txt separator">-</span>
                                <small>{{ field.key }}</small>
                                <small class="block txt-hint" v-if="fieldTypes[field.type]">{{ fieldTypes[field.type].title }}</small>
                            </div>
                            <div class="sortable-item-elem ctrls">
                                <div class="ctrl-item edit-ctrl" @click.prevent="editField(index)"><i class="di di-gear"></i></div>
                                <div class="ctrl-item delete-ctrl" @click.prevent="removeField(index)"><i class="di di-trash"></i></div>
                            </div>
                        </vddl-draggable>

                        <vddl-placeholder class="sortable-item sortable-placeholder"></vddl-placeholder>
                    </vddl-list>

                    <!-- Advanced panel START -->
                    <div class="block m-t-small">
                        <span class="link-dark-grey" @click.prevent="toggleAdvanced">
                            <span class="txt">Advanced Settings</span>
                            <i class="di di-chevron-down" v-show="!advanced"></i>
                            <i class="di di-chevron-up" v-show="advanced"></i>
                        </span>

                        <div class="panel p-small m-t-5 m-b-small" v-show="advanced">
                            <form-field class="form-group form-group-compact" :track="collection.create_hook" name="create_hook">
                                <label for="create_hook">Create POST Hook</label>
                                <input type="text" v-model="collection.create_hook" id="create_hook">
                            </form-field>

                            <form-field class="form-group form-group-compact" :track="collection.update_hook" name="update_hook">
                                <label for="update_hook">Update POST Hook</label>
                                <input type="text" v-model="collection.update_hook" id="update_hook">
                            </form-field>

                            <form-field class="form-group form-group-compact" :track="collection.delete_hook" name="delete_hook">
                                <label for="delete_hook">Delete POST Hook</label>
                                <input type="text" v-model="collection.delete_hook" id="delete_hook">
                            </form-field>
                        </div>
                    </div>
                    <!-- Advanced panel END -->

                    <hr class="m-t-small">

                    <div class="block">
                        <router-link :to="{ name: 'collection-index' }" class="btn btn-grey float-left">
                            <span class="txt">Cancel</span>
                        </router-link>

                        <button class="btn btn-success float-right">
                            <span class="txt" v-if="scenario === 'create'">Create Collection</span>
                            <span class="txt" v-else>Update Collection</span>
                        </button>
                        <div class="clearfix"></div>
                    </div>
                </form>
            </div>
        </div>

        <plain-form @cancel="onFieldFormCancel" @submit="onFieldFormSubmit" ref="plainFieldForm"></plain-form>
        <editor-form @cancel="onFieldFormCancel" @submit="onFieldFormSubmit" ref="editorFieldForm"></editor-form>
        <select-form @cancel="onFieldFormCancel" @submit="onFieldFormSubmit" ref="selectFieldForm"></select-form>
        <date-form @cancel="onFieldFormCancel" @submit="onFieldFormSubmit" ref="dateFieldForm"></date-form>
        <switch-form @cancel="onFieldFormCancel" @submit="onFieldFormSubmit" ref="switchFieldForm"></switch-form>
        <checklist-form @cancel="onFieldFormCancel" @submit="onFieldFormSubmit" ref="checklistFieldForm"></checklist-form>
        <media-form @cancel="onFieldFormCancel" @submit="onFieldFormSubmit" ref="mediaFieldForm"></media-form>
        <relation-form @cancel="onFieldFormCancel" @submit="onFieldFormSubmit" ref="relationFieldForm"></relation-form>
    </div>
</template>

<script src="./form.component.js"></script>
