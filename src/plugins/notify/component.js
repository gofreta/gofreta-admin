import { events } from './events'

/**
 * Notify component settings.
 *
 * @author Gani Georgiev <gani.georgiev@gmail.com>
 */
export default {
    name: 'notify',
    data() {
        return {
            items: {}
        }
    },
    mounted() {
        events.$on('add', this.add);
    },
    methods: {
        add(message, style = 'success', duration = 5000, closeBtn = true) {
            var item = {
                'id':           Date.now() + '_' + Object.keys(this.items).length,
                'message':      message,
                'style':        style,
                'duration':     duration,
                'closeBtn':     closeBtn,
                'isClosing':    false,
                'closeTimeout': null,
            };

            this.$set(this.items, item.id, item);

            if (item.duration > 0) {
                setTimeout(() => {
                    this.remove(item.id);
                }, item.duration);
            }
        },
        remove(id) {
            if (!this.items[id]) {
                return;
            }

            if (this.items[id].closeTimeout) {
                clearTimeout(this.items[id].closeTimeout);
            }

            this.items[id].isClosing = true;

            this.items[id].closeTimeout = setTimeout(() => {
                this.items[id].isClosing = false;

                delete this.items[id];
            }, 450);
        },
    }
}
