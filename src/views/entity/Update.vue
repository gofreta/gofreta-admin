<template>
    <div>
        <header class="content-header">
            <div class="wrapper">
                <nav class="breadcrumb">
                    <ul>
                        <li class="breadcrumb-item">
                            <router-link :to="{ name: 'collection-index' }">Collections</router-link>
                        </li>
                        <li class="breadcrumb-item">
                            <router-link :to="{ name: 'entity-index' }">{{ collection.title }}</router-link>
                        </li>
                        <li class="breadcrumb-item">Edit Item</li>
                    </ul>
                </nav>
            </div>
        </header>

        <inline-loader class="wrapper" ref="inlineLoader">
            <entity-form
                v-if="entity.id"
                :errors="errors"
                :collection="collection"
                :entity="entity"
                @submit="updateEntity"
                @change="onFormChange"
            ></entity-form>
        </inline-loader>
    </div>
</template>

<script src="./update.component.js"></script>
