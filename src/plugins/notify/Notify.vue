<template>
    <div class="notifications-wrapper">
        <div
            v-for="item in items"
            class="alert"
            :class="['alert-' + item.style, {'remove-start': item.isClosing, 'with-close-btn': item.closeBtn}]"
            :key="item.id"
        >
            <span class="close-handle" v-if="item.closeBtn" @click.prevent="remove(item.id)">
                <i class="di di-cross"></i>
            </span>

            <div class="content">{{ item.message }}</div>
        </div>
    </div>
</template>

<script src="./component.js"></script>
