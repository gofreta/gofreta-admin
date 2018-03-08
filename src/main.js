import Vue       from 'vue'
import Vddl      from 'vddl';
import App       from '@/App'
import router    from '@/Router'
import Loader    from '@/plugins/loader/plugin'
import Notify    from '@/plugins/notify/plugin'
import Alert     from '@/plugins/alert/plugin'
import Paging    from '@/plugins/paging/plugin'
import Popup     from '@/plugins/popup/plugin'
import Dropdown  from '@/plugins/dropdown/plugin'
import Field     from '@/plugins/field/plugin'
import VueHelper from '@/utils/VueHelper';

Vue.config.productionTip = false

Vue.use(Loader);
Vue.use(Notify);
Vue.use(Alert);
Vue.use(Paging);
Vue.use(Popup);
Vue.use(Dropdown);
Vue.use(Field);
Vue.use(Vddl);
Vue.use(VueHelper);

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
});
