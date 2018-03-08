<template>
    <div class="full-height-block">
        <div class="content p-b-base">
            <h1 class="app-logo txt-primary txt-center m-t-0 m-b-base">Gofreta</h1>

            <div class="panel panel-float p-base">
                <form @submit.prevent="onSubmit">
                    <form-field class="form-group form-group-compact" :track="resetHash" name="reset_password_hash">
                        <label for="reset_password_hash">Reset Password Hash</label>
                        <input type="text" v-model="resetHash" id="reset_password_hash" required>
                    </form-field>

                    <form-field class="form-group form-group-compact" :track="password" name="password">
                        <label for="reset_password_new_password">Password</label>
                        <input type="password" v-model="password"  id="reset_password_new_password" required>
                    </form-field>

                    <form-field class="form-group form-group-compact" :track="passwordConfirm" name="password_confirm">
                        <label for="reset_password_new_password_confirm">Password Confirm</label>
                        <input type="password" v-model="passwordConfirm"  id="reset_password_new_password_confirm" required>
                    </form-field>

                    <button class="btn block btn-primary">
                        <span class="txt">Send Reset Email</span>
                    </button>
                </form>

                <small class="block txt-center txt-hint m-t-small">
                    <router-link :to="{ name: 'login' }"><i class="di di-arrow-thin-left"></i> Back to login</router-link>
                </small>
            </div>
        </div>
    </div>
</template>

<script src="./reset-password.component.js"></script>
