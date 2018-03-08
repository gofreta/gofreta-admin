/**
 * Alert box component settings.
 *
 * @author Gani Georgiev <gani.georgiev@gmail.com>
 */
export default {
    name: 'alert',
    props: {
        closeBtn: {
            type: Boolean,
            default: true
        },
        timeout: {
            type: Number,
            default: 5000
        },
        visibility: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            active: true,
            hideTimeoutId: null
        }
    },
    watch: {
        visibility: function (val) {
            if (val) {
                this.show();
            } else {
                this.hide();
            }
        }
    },
    mounted() {
        if (this.timeout > 0) {
            this.hideTimeoutId = setTimeout(() => {
                this.hide();
            }, this.timeout);
        }
    },
    methods: {
        hide() {
            clearTimeout(this.hideTimeoutId);

            this.active = false;
        },
        show() {
            this.active = true;
        }
    }
}
