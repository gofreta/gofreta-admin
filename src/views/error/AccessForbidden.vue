<template>
    <div class="wrapper txt-center">
        <div class="block txt-center p-base">
            <img src="@/assets/images/gopher_no.png" alt="Access forbidden image" class="mascot">
            <h1>Access Forbidden (403)</h1>

            <div class="alert alert-danger m-t-base m-b-base">You don't have access rights to perform this request.</div>

            <p class="txt-hint">If you think that this is a system error, please <a :href="'mailto:' + $appConfig().supportEmail">contact us</a>.</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'access-forbidden'
}
</script>
