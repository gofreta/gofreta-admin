import Paging from './Paging.vue'

export default {
    install(Vue, options = {}) {
        if (this.installed) {
            return;
        }

        this.installed = true;

        Vue.component('paging', Paging);
    }
}
