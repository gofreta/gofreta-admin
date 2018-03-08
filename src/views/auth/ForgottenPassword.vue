<template>
    <div class="full-height-block">
        <div class="content p-b-base">
            <h1 class="app-logo txt-primary txt-center m-t-0 m-b-base">Gofreta</h1>

            <div class="panel panel-float p-base">
                <alert class="alert-success m-b-0 txt-center" v-if="success" :timeout="0" :closeBtn="false">
                    <p>Successfully send reset password email!</p>
                    <p>Please check your email for further instructions.</p>
                </alert>

                <form @submit.prevent="onSubmit" v-else>
                    <form-field class="form-group form-group-compact" :track="username" name="username">
                        <label for="forgotten_password_username">Username</label>
                        <input type="text" v-model="username"  id="forgotten_password_username" required>
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

<script src="./forgotten-password.component.js"></script>
