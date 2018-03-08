import Notify     from './Notify.vue'
import { events } from './events'

const DEFAULT_DURATION = 5000;

export default {
    install(Vue, options = {}) {
        if (this.installed) {
            return;
        }

        this.installed = true;

        Vue.component('notify', Notify);

        Vue.prototype.$notify = (message, style = 'success', duration = DEFAULT_DURATION, closeBtn = true) => {
            events.$emit('add', message, style, duration, closeBtn);
        };
    }
}
