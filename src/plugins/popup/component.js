var closeTimeout = null;

export default {
    name: 'popup',
    props: {
        closeBtn: {
            type: Boolean,
            default: true
        },
        title: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            active:    false,
            isClosing: false,
        }
    },
    methods: {
        hide() {
            this.active = false;
            this.isClosing = true;

            if (closeTimeout) {
                clearTimeout(closeTimeout);
            }

            closeTimeout = setTimeout(() => {
                this.isClosing = false;
            }, 450);
        },
        show() {
            this.active  = true
            this.isClosing = false;
        }
    }
}
