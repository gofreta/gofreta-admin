import Dropdown from './Dropdown.vue'

export default {
    install(Vue, options = {}) {
        if (this.installed) {
            return;
        }

        this.installed = true;

        Vue.component('dropdown', Dropdown);
    }
}
