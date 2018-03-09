<template>
    <div>
        <popup ref="mediaPopup" class="popup-lg">
            <div class="tabs">
                <div class="tabs-header">
                    <div class="tab-item" :class="{'active': activeTab === 'listing'}" @click.prevent="changeTab('listing')">
                        <i class="di di-archive"></i>
                        <span class="txt">File picker</span>
                    </div>
                    <div class="tab-item" :class="{'active': activeTab === 'upload'}" @click.prevent="changeTab('upload')">
                        <i class="di di-cloud-upload"></i>
                        <span class="txt">Upload New File</span>
                    </div>
                </div>

                <div class="tabs-content p-l-0 p-r-0 p-b-0">
                    <div class="tab-item" :class="{'active': activeTab === 'listing'}">
                        <div class="filter-panel filter-compact">
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

                            <div class="filter-item search-box">
                                <div class="form-group form-group-sm">
                                    <input type="text" id="filter_search" v-model="search" placeholder="Search..." @keyup="loadItems(1)">
                                </div>
                            </div>
                        </div>

                        <div class="media-picker-list">
                            <template v-if="items.length">



                                <figure class="media-item" v-for="(item, index) in items" :key="item.id" @click="onItemSelect(item)">
                                    <div class="featured-thumb" :class="{'has-thumb': item.type == 'image'}">
                                        <div class="thumb-content">
                                            <img :src="item.path" :alt="item.title" v-if="item.type == 'image'">
                                        </div>
                                    </div>
                                    <div class="caption">{{ item.title }}</div>
                                </figure>
                            </template>

                            <div v-else-if="loaded && !items.length" class="block txt-center">
                                <img src="@/assets/images/gopher_sorry.png" alt="Gopher sorry" class="mascot">
                                <h5>Oops, no media items were found!</h5>
                                <div class="clearfix m-b-15"></div>
                                <button type="button" v-if="hasFilter" @click="resetList()" class="btn btn-cons btn-warning">Reset Filters</button>
                            </div>
                        </div>

                        <paging ref="paging" :updateRoute="false" @change="onPageChange"></paging>
                    </div>

                    <div class="tab-item" :class="{'active': activeTab === 'upload'}">
                        <upload-form ref="uploadForm" @queuecomplete="onUploadComplete"></upload-form>
                    </div>
                </div>
            </div>
        </popup>
    </div>
</template>

<script src="./media-picker.component.js"></script>
