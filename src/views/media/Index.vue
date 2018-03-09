<template>
    <div>
        <header class="content-header">
            <div class="wrapper">
                <nav class="breadcrumb">
                    <ul>
                        <li class="breadcrumb-item">Media</li>
                    </ul>
                </nav>

                <div class="btn-group">
                    <button class="btn btn-success" @click="showUploadPopup" v-if="$canAccess('media', 'upload')">
                        <i class="di di-cloud-upload"></i>
                        <span class="txt">Upload File</span>
                    </button>
                </div>
            </div>
        </header>

        <inline-loader class="wrapper" ref="inlineLoader">
            <div class="filter-panel filter-transp">
                <div class="filter-item">
                    <div class="form-group form-group-sm">
                        <label for="filter_sort">Sort</label>
                        <select id="filter_sort" v-model="sort" @change="loadItems(1)">
                            <option :value="val" v-for="type, val in sortOptions" :key="val">
                                {{ type }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="filter-item">
                    <div class="form-group form-group-sm">
                        <label for="filter_type">Filter Type</label>
                        <select id="filter_type" v-model="type" @change="loadItems(1)">
                            <option :value="val" v-for="type, val in typeOptions" :key="val">
                                {{ type }}
                            </option>
                        </select>
                    </div>
                </div>

                <div class="filter-item" v-show="bulkSelected.length > 0 && $canAccess('media', 'delete')">
                    <button class="btn btn-sm btn-danger m-r-10" @click.prevent="deleteBulkSelection">
                        <i class="di di-trash"></i>
                        <span class="txt">Delete selected</span>
                    </button>
                    <button class="btn btn-sm btn-transp btn-grey txt-dark-grey" @click.prevent="resetBulkSelection">Reset selection</button>
                </div>

                <div class="filter-item search-box">
                    <div class="form-group form-group-sm">
                        <input type="text" id="filter_search" v-model="search" placeholder="Search..." @keyup="loadItems(1)">
                    </div>
                </div>
            </div>

            <div class="media-list">
                <template v-if="items.length">
                    <figure class="media-item" v-for="(item, index) in items" :key="item.id">
                        <div
                            class="form-group form-group-color-danger bulk-toggle"
                            :class="{'active': bulkSelected.indexOf(item.id) >= 0}"
                            v-if="$canAccess('media', 'delete')"
                        >
                            <input type="checkbox" :id="'bulk_' + item.id" :value="item.id" v-model="bulkSelected">
                            <label :for="'bulk_' + item.id"></label>
                        </div>

                        <router-link class="featured-thumb" :class="{'has-thumb': item.type == 'image'}" :to="{name: 'media-view', params: { id: item.id }}">
                            <div class="thumb-content">
                                <img :src="item.path" :alt="item.title" v-if="item.type == 'image'">
                            </div>
                        </router-link>

                        <router-link class="title" :to="{name: 'media-view', params: { id: item.id }}">{{ item.title }}</router-link>
                    </figure>
                </template>

                <div v-else-if="loaded && !items.length" class="block txt-center">
                    <img src="@/assets/images/gopher_sorry.png" alt="Gopher sorry" class="mascot">
                    <h5>Oops, no media items were found!</h5>
                    <div class="clearfix m-b-15"></div>
                    <button type="button" v-if="hasFilter" @click="resetList()" class="btn btn-cons btn-warning">Reset Filters</button>
                </div>
            </div>

            <paging ref="paging"></paging>
        </inline-loader>

        <popup title="Media upload" ref="uploadPopup">
            <upload-form ref="uploadForm" @queuecomplete="onUploadComplete"></upload-form>
        </popup>
    </div>
</template>

<script src="./index.component.js"></script>
