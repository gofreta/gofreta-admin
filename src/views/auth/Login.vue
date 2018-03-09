<template>
    <div class="full-height-block">
        <div class="content p-b-base">
            <h1 class="app-logo txt-primary txt-center m-t-0 m-b-base">Gofreta</h1>

            <div class="panel panel-float p-base">
                <alert class="alert-danger" v-if="errorMessage" ref="errors">
                    <p>{{ errorMessage }}</p>
                </alert>

                <form @submit.prevent="onSubmit">
                    <form-field class="form-group form-group-compact" :track="username" name="username">
                        <label for="login_username">Username</label>
                        <input type="text" v-model="username"  id="login_username" required>
                    </form-field>

                    <form-field class="form-group form-group-compact" :track="password" name="password">
                        <label for="login_password">Password</label>
                        <input type="password" v-model="password" id="login_password" required>

                        <router-link
                            :to="{name: 'forgotten-password'}"
                            class="txt-hint forgotten-password-link float-right"
                        >
                            <small>Forgotten Password?</small>
                        </router-link>

                        <div class="clearfix"></div>
                    </form-field>

                    <button class="btn btn-cons block btn-primary float-right">
                        <span class="txt">Login</span>
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script src="./login.component.js"></script>
