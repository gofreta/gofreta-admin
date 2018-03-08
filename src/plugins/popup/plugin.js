import Popup from './Popup.vue'

export default {
    install(Vue, options = {}) {
        if (this.installed) {
            return;
        }

        this.installed = true;

        Vue.component('popup', Popup);
    }
}
