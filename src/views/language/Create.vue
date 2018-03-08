<template>
    <div>
        <header class="content-header">
            <div class="wrapper">
                <nav class="breadcrumb">
                    <ul>
                        <li class="breadcrumb-item">
                            <router-link :to="{name: 'language-index'}">Languages</router-link>
                        </li>
                        <li class="breadcrumb-item">Create</li>
                    </ul>
                </nav>
            </div>
        </header>

        <inline-loader class="wrapper" ref="inlineLoader">
            <language-form @submit="createLanguage"></language-form>
        </inline-loader>
    </div>
</template>

<script src="./create.component.js"></script>
