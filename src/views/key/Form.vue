<template>
    <div class="block">
        <form class="panel p-small" @submit.prevent="onSubmit">
            <form-field class="form-group form-group-compact" :track="model.title" name="title">
                <label for="model_title">Title <em>*</em></label>
                <input type="text" v-model="model.title" id="model_title" required>
            </form-field>

            <div class="block" v-if="scenario == 'update'">
                <p class="txt-hint"><strong>Token</strong></p>
                <div class="alert alert-warning no-shadow">
                    <strong class="txt-break">{{model.token}}</strong>
                </div>
            </div>

            <div class="block">
                <p class="txt-hint m-b-0"><strong>Access Rights</strong></p>
                <permissions-list :exclude="['user', 'key', 'language', 'collection']" :initSelected="model.access" ref="accessRightsList"></permissions-list>
            </div>

            <hr>

            <div class="block">
                <router-link :to="{name: 'key-index'}" class="btn btn-grey float-left">
                    <span class="txt">Cancel</span>
                </router-link>

                <button class="btn btn-cons btn-success float-right">
                    <span class="txt" v-if="scenario == 'create'">Create</span>
                    <span class="txt" v-else>Update</span>
                </button>
            </div>
        </form>
    </div>
</template>

<script src="./form.component.js"></script>
