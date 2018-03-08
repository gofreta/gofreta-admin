<template>
    <div class="popup" :class="{ 'active': active, 'close-start': isClosing }">
        <div class="popup-content">
            <span class="popup-close close-icon" @click="hide" v-if="closeBtn"></span>

            <h3 class="popup-title" v-if="title.length > 0">{{ title }}</h3>

            <div class="content">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script src="./component.js"></script>
