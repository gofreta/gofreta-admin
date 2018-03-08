import Inline     from './Inline.vue'
import Loader     from './Loader.vue'
import { events } from './events'


export default {
    install(Vue, options = {}) {
        if (this.installed) {
            return;
        }

        this.installed = true;

        Vue.component('inline-loader', Inline);
        Vue.component('loader', Loader);

        Vue.prototype.$showLoader = () => {
            events.$emit('show');
        };

        Vue.prototype.$hideLoader = () => {
            events.$emit('hide');
        };
    }
}
