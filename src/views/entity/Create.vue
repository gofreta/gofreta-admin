<template>
    <div>
        <header class="content-header">
            <div class="wrapper">
                <nav class="breadcrumb">
                    <ul>
                        <li class="breadcrumb-item">
                            <router-link :to="{name: 'collection-index'}">Collections</router-link>
                        </li>
                        <li class="breadcrumb-item">
                            <router-link :to="{name: 'entity-index', params: {cid: collection.name}}">{{ collection.title }}</router-link>
                        </li>
                        <li class="breadcrumb-item">Create New Item</li>
                    </ul>
                </nav>
            </div>
        </header>

        <inline-loader class="wrapper" ref="inlineLoader">
            <entity-form
                v-if="collection.id"
                :errors="errors"
                :collection="collection"
                @submit="createEntity"
            ></entity-form>
        </inline-loader>
    </div>
</template>

<script src="./create.component.js"></script>
