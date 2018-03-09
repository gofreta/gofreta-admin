<template>
    <div>
        <header class="content-header">
            <div class="wrapper">
                <nav class="breadcrumb">
                    <ul>
                        <li class="breadcrumb-item">
                            <router-link :to="{name: 'user-index'}">Users</router-link>
                        </li>
                        <li class="breadcrumb-item">Create</li>
                    </ul>
                </nav>
            </div>
        </header>

        <inline-loader class="wrapper" ref="inlineLoader">
            <form class="panel p-small" @submit.prevent="onSubmit">
                <div class="row">
                    <div class="cols-6">
                        <form-field class="form-group form-group-compact" :track="form.username" name="username">
                            <label for="model_username">Username <em>*</em></label>
                            <input type="text" v-model="form.username" id="model_username" required>
                        </form-field>
                    </div>
                    <div class="cols-6">
                        <form-field class="form-group form-group-compact" :track="form.email" name="email">
                            <label for="model_email">Email <em>*</em></label>
                            <input type="text" v-model="form.email" id="model_email" required>
                        </form-field>
                    </div>
                </div>

                <div class="row">
                    <div class="cols-6">
                        <form-field class="form-group form-group-compact" :track="form.password" name="password">
                            <label for="model_password">Password <em>*</em></label>
                            <input type="password" v-model="form.password" id="model_password" required>
                        </form-field>
                    </div>
                    <div class="cols-6">
                        <form-field class="form-group form-group-compact" :track="form.password_confirm" name="password_confirm">
                            <label for="model_password_confirm">Password Confirm <em>*</em></label>
                            <input type="password" v-model="form.password_confirm" id="model_password_confirm" required>
                        </form-field>
                    </div>
                </div>

                <div class="block">
                    <p class="txt-hint m-b-0"><strong>Access Rights</strong></p>
                    <permissions-list :initSelected="form.access" ref="accessRightsList"></permissions-list>
                </div>

                <hr>

                <div class="block">
                    <router-link :to="{name: 'user-index'}" class="btn btn-grey float-left">
                        <span class="txt">Cancel</span>
                    </router-link>

                    <button class="btn btn-cons btn-success float-right">
                        <span class="txt">Create</span>
                    </button>
                </div>
            </form>
        </inline-loader>
    </div>
</template>

<script src="./create.component.js"></script>
