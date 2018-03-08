<template>
    <div>
        <header class="content-header">
            <div class="wrapper">
                <nav class="breadcrumb">
                    <ul>
                        <li class="breadcrumb-item">Collections</li>
                    </ul>
                </nav>

                <div class="btn-group">
                    <router-link
                        class="btn btn-cons btn-success"
                        :to="{name: 'collection-create'}"
                        v-if="items.length && $canAccess('collection', 'create')"
                    >
                        <i class="di di-plus"></i>
                        <span class="txt">New Collection</span>
                    </router-link>
                </div>
            </div>
        </header>

        <inline-loader class="wrapper" ref="inlineLoader">
            <div class="collections-list">
                <router-link
                    v-for="(item, index) in items"
                    class="box"
                    :key="item.id"
                    :to="{name: 'entity-index', params: {cid: item.name}}"
                >
                    <div class="box-content">
                        <h3 class="title">{{ item.title }}</h3>
                        <div class="meta">Name: <em>{{ item.name }}</em></div>
                    </div>
                    <div class="box-side top-right">
                        <div @click.prevent.stop="openDropdown(index)" class="box-side-item">
                            <i class="di di-dots-3"></i>

                            <dropdown class="dropdown-compact" ref="collection_dropdown">
                                <router-link
                                    tag="div"
                                    class="dropdown-item"
                                    :to="{name: 'collection-update', params: {cid: item.name}}"
                                    v-if="$canAccess('collection', 'update')"
                                >
                                    <i class="di di-gear"></i>
                                    <span class="txt">Edit</span>
                                </router-link>
                                <div
                                    class="dropdown-item dropdown-item-danger"
                                    @click.prevent.stop="onDelete(item.id)"
                                    v-if="$canAccess('collection', 'delete')"
                                >
                                    <i class="di di-trash"></i>
                                    <span class="txt">Delete</span>
                                </div>
                            </dropdown>
                        </div>
                    </div>
                </router-link>
            </div>
            <paging ref="paging"></paging>

            <div class="block txt-center p-base" v-if="!items.length">
                <img src="@/assets/images/gopher_cheer.png" alt="Gopher cheer" class="mascot">
                <h5>It seems that you don't have any Collections yet.</h5>
                <div class="clearfix m-b-15"></div>
                <router-link :to="{name: 'collection-create' }" class="btn btn-lg btn-cons-lg btn-success">
                    <span class="txt">Create your first Collection</span>
                </router-link>
            </div>
        </inline-loader>
    </div>
</template>

<script src="./index.component.js"></script>
