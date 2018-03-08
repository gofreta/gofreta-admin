<template>
    <form class="panel p-small" @submit.prevent="onSubmit">
        <div class="row">
            <div class="cols-6">
                <form-field class="form-group form-group-compact" :track="model.title" name="title">
                    <label for="language_title">Title <em>*</em></label>
                    <input type="text" v-model="model.title" id="language_title" required>
                </form-field>
            </div>
            <div class="cols-6">
                <form-field class="form-group form-group-compact" :track="model.locale" name="locale">
                    <label for="language_locale">Locale <em>*</em></label>
                    <input type="text" v-model="model.locale" id="language_locale" required>
                </form-field>
            </div>
        </div>

        <hr class="m-t-0">

        <div class="block">
            <router-link :to="{ name: 'language-index' }" class="btn btn-grey float-left">
                <span class="txt">Cancel</span>
            </router-link>

            <button class="btn btn-cons btn-success float-right">
                <span class="txt" v-if="scenario == 'create'">Create</span>
                <span class="txt" v-else>Update</span>
            </button>
        </div>
    </form>
</template>

<script src="./form.component.js"></script>
