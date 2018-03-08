<template>
    <div class="alert" v-if="active">
        <span class="close-handle" v-if="closeBtn" @click="hide()">
            <i class="di di-cross"></i>
        </span>

        <div class="content">
            <slot>Oops, something went wrong.</slot>
        </div>
    </div>
</template>

<script src="./component.js"></script>
