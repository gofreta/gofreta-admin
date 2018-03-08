<template>
    <div>
        <div class="inline-loader" v-show="active">
            <span class="icon v-align-middle loader-icon txt-dark-grey" :class="{'active': active}">
                <i class="di di-loading"></i>
            </span>
        </div>

        <div class="block" v-show="!active" :class="{'entrance-animate': !active}">
            <slot></slot>
        </div>
    </div>
</template>

<script src="./inline.component.js"></script>
