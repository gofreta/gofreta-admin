<template>
    <header class="page-header">
        <div class="wrapper">
            <router-link :to="{name: $appConfig().homepageRoute}" class="header-item logo">
                <span class="txt">Gofreta</span>
                <span class="label label-warning">beta</span>
            </router-link>

            <nav class="header-item main-menu">
                <ul>
                    <router-link :to="{name: 'collection-index'}" tag="li" class="menu-item" active-class="active" v-if="$canAccess('collection', 'index')">
                        <i class="di di-inbox"></i>
                        <span class="txt">Collections</span>
                    </router-link>
                    <router-link :to="{name: 'media-index'}" tag="li" class="menu-item" active-class="active" v-if="$canAccess('media', 'index')">
                        <i class="di di-photo"></i>
                        <span class="txt">Media</span>
                    </router-link>
                    <li class="menu-item">
                        <i class="di di-gear"></i>
                        <span class="txt">Settings</span>

                        <nav class="sub-menu">
                            <ul>
                                <router-link :to="{name: 'language-index'}" tag="li" class="sub-menu-item" active-class="active">
                                    <span class="txt">Languages</span>
                                </router-link>
                                <router-link :to="{name: 'key-index'}" tag="li" class="sub-menu-item" active-class="active" v-if="$canAccess('key', 'index')">
                                    <span class="txt">Keys</span>
                                </router-link>
                                <router-link :to="{name: 'user-index'}" tag="li" class="sub-menu-item" active-class="active" v-if="$canAccess('user', 'index')">
                                    <span class="txt">Users</span>
                                </router-link>
                            </ul>
                        </nav>
                    </li>
                </ul>
            </nav>

            <div class="header-item profile">
                <div>
                    <template v-if="user && user.id">
                        <router-link :to="{name: 'user-update', params: { 'id': user.id }}" class="profile-label" v-if="$canAccess('user', 'update')">
                            <span class="txt">{{ user.username }}</span>
                        </router-link>
                        <span class="txt" v-else>{{ user.username }}</span>

                        <span class="delimiter">&nbsp;|&nbsp;</span>
                    </template>
                    <span class="logout-link" @click.prevent="$logout()">&nbsp;Logout</span>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
import AuthHelper from '@/utils/AuthHelper'

export default {
    name: 'header-bar',
    data() {
        return {
            user: null
        }
    },
    watch: {
        '$route.name'(val) {
            // renew
            this.user = AuthHelper.getData('user');
        }
    },
    mounted() {
        this.user = AuthHelper.getData('user');
    }
}
</script>
