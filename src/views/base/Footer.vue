<template>
    <footer class="page-footer">
        <div class="wrapper">
            <div class="footer-item terms">{{ year }}&nbsp;<span class="txt-title">Gofreta</span></div>

            <div class="footer-item credits">Crafted by <a href="https://gani.bg" target="_blank">Gani</a></div>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'footer-bar',
    data() {
        return {
            year:    (new Date()).getFullYear(),
            version: VERSION || '0.1.0'
        }
    }
}
</script>
