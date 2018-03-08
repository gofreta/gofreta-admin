import Field from './Field.vue'
import { events } from './events'

export default {
    install(Vue, options = {}) {
        if (this.installed) {
            return;
        }

        this.installed = true;

        Vue.component('form-field', Field);

        Vue.prototype.$registerFieldErrors = (errors = {}) => {
            events.$emit('registerFieldErrors', errors);
        };
    }
}
