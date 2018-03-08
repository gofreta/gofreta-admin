<template>
    <div>
        <header class="content-header">
            <div class="wrapper">
                <nav class="breadcrumb">
                    <ul>
                        <li class="breadcrumb-item">
                            <router-link :to="{ name: 'collection-index' }">Collections</router-link>
                        </li>
                        <li class="breadcrumb-item">Update</li>
                    </ul>
                </nav>
            </div>
        </header>

        <inline-loader class="wrapper" ref="inlineLoader">
            <alert class="alert-primary alert-transp" :timeout="0">
                <div class="content">
                    <p>
                        <strong>Warning!</strong> Keep in mind that the following actions could result in data loss:
                        <ul>
                            <li>Removing fields.</li>
                            <li>Renaming field API Keys.</li>
                        </ul>
                    </p>
                </div>
            </alert>

            <collection-form :errors="errors" ref="collectionForm" scenario="update" @submit="onSubmit"></collection-form>
        </inline-loader>
    </div>
</template>

<script src="./update.component.js"></script>
