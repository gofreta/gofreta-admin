<template>
    <div :class="{ 'has-error': (error.length > 0) }">
        <slot></slot>

        <div class="error" v-show="error.length > 0">{{ error }}</div>
    </div>
</template>

<script src="./component.js"></script>
