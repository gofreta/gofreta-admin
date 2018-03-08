import { events } from './events'
import LoaderMixin from './mixin'

/**
 * Generic Loader component settings.
 *
 * @author Gani Georgiev <gani.georgiev@gmail.com>
 */
export default {
    mixins: [ LoaderMixin ],
    name: 'loader',
    mounted() {
        events.$on('show', this.show);

        events.$on('hide', this.hide);
    }
}
