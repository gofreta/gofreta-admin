import Permissions from './Permissions.vue'

export default {
    install(Vue, options = {}) {
        if (this.installed) {
            return;
        }

        this.installed = true;

        Vue.component('permissions-list', Permissions);
    }
}
