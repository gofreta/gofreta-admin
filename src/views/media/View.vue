<template>
    <div>
        <header class="content-header">
            <div class="wrapper">
                <nav class="breadcrumb">
                    <ul>
                        <li class="breadcrumb-item">
                            <router-link :to="{ name: 'media-index' }">Media</router-link>
                        </li>
                        <li class="breadcrumb-item">
                            <span class="txt">File preview</span>
                            <span
                                class="ctrl m-l-5"
                                title="Delete item"
                                @click.prevent="deleteFile"
                                v-if="item.id && $canAccess('media', 'delete')"
                            >
                                <i class="di di-trash"></i>
                            </span>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>

        <inline-loader class="wrapper" ref="inlineLoader">
            <div class="row" v-if="item.id">
                <div class="cols-6">
                    <form class="block" @submit.prevent="onSubmit">
                        <table class="table v-align-middle table-shadowize">
                            <tbody>
                                <tr>
                                    <th><label for="media_title">Title</label></th>
                                    <td>
                                        <div class="form-group form-group m-0">
                                            <input id="media_title" type="text" v-model="item.title" required :disabled="!$canAccess('media', 'update')">
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th class="v-align-top"><label for="media_description">Description</label></th>
                                    <td>
                                        <div class="form-group form-group m-0">
                                            <textarea id="media_description" v-model="item.description" maxlength="255" :disabled="!$canAccess('media', 'update')"></textarea>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Type</th>
                                    <td>
                                        <small class="label label-grey">{{ item.type }}</small>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Path</th>
                                    <td class="txt-break txt-hint">
                                        <a :href="item.path" target="_blank">{{ item.path }}</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div class="block m-t-small" v-if="$canAccess('media', 'update')">
                            <button type="button" class="btn btn-cons btn-grey float-left" @click="onReset" v-show="hasChanges">Cancel changes</button>
                            <button class="btn btn-cons float-right" :class="hasChanges ? 'btn-success' : 'btn-disabled'">Update</button>
                        </div>
                    </form>
                </div>
                <div class="cols-6">
                    <figure class="preview-panel" v-if="item.type == 'image'">
                        <a :href="item.path" target="_blank">
                            <img :src="item.path" :alt="item.title">
                        </a>
                    </figure>
                </div>
            </div>
        </inline-loader>
    </div>
</template>

<script src="./view.component.js"></script>
