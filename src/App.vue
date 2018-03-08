<template>
    <div id="app">
        <header-bar v-if="showHeader"></header-bar>

        <notify></notify>

        <loader></loader>

        <router-view></router-view>

        <footer-bar></footer-bar>
    </div>
</template>

<style src="./assets/scss/style.scss" lang="scss"></style>

<script>
import Header from '@/views/base/Header'
import Footer from '@/views/base/Footer'

export default {
    name: 'app',
    components: {
        'header-bar': Header,
        'footer-bar': Footer
    },
    data() {
        return {
            showHeader: false
        }
    },
    beforeMount() {
        this.$setDocumentTitle('');
    },
    mounted() {
        this.toggleHeader();
    },
    watch: {
        '$route': function (to, from) {
            this.toggleHeader();
        }
    },
    methods: {
        /**
         * Toggles page header visibility.
         */
        toggleHeader() {
            if (this.$isGuest()) {
                this.showHeader = false;
            } else {
                this.showHeader = true;
            }
        }
    }
}
</script>
