<template>
    <div>
        <header class="content-header">
            <div class="wrapper">
                <nav class="breadcrumb">
                    <ul>
                        <li class="breadcrumb-item">
                            <router-link :to="{ name: 'collection-index' }">Collections</router-link>
                        </li>
                        <li class="breadcrumb-item">Create</li>
                    </ul>
                </nav>
            </div>
        </header>

        <inline-loader class="wrapper" ref="inlineLoader">
            <collection-form :errors="errors" ref="collectionForm" @submit="onSubmit"></collection-form>
        </inline-loader>
    </div>
</template>

<script src="./create.component.js"></script>
