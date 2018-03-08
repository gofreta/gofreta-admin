<template>
    <div>
        <header class="content-header">
            <div class="wrapper">
                <nav class="breadcrumb">
                    <ul>
                        <li class="breadcrumb-item">
                            <router-link :to="{ name: 'collection-index' }">Collections</router-link>
                        </li>
                        <li class="breadcrumb-item">{{ collection.title }}</li>
                    </ul>
                </nav>

                <div class="btn-group" v-if="collection.name">
                    <router-link class="btn btn-cons btn-dark-grey m-r-small" :to="{ name: 'collection-update', params: { cid: collection.name } }">
                        <i class="di di-article"></i>
                        <span class="txt">Edit Collection</span>
                    </router-link>
                    <router-link class="btn btn-cons btn-success" :to="{ name: 'entity-create', params: { cid: collection.name } }">
                        <i class="di di-plus"></i>
                        <span class="txt">New Item</span>
                    </router-link>
                </div>
            </div>
        </header>

        <inline-loader class="wrapper" ref="inlineLoader">
            <entities-list ref="entitiesList" :cid="$route.params.cid" :syncQueryPage="true" @collection-loaded="initCollection">
                <div slot="actions" slot-scope="props">
                    <router-link :to="{ name: 'entity-update', params: { cid: props.collection.name, id: props.entity.id }}" class="btn btn-sm btn-primary">
                        <i class="di di-pencil"></i>
                        <span class="txt">Edit</span>
                    </router-link>
                    <button type="button" class="btn btn-sm btn-transp btn-grey txt-danger m-l-10" @click.prevent="onDelete(props.entity.id)">
                        <i class="di di-trash"></i>
                    </button>
                </div>
            </entities-list>
        </inline-loader>
    </div>
</template>

<script src="./index.component.js"></script>
