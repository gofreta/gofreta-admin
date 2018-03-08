export default {
    props: {
        showDelay: {
            type: Number,
            default: 0
        },
        hideDelay: {
            type: Number,
            default: 150
        }
    },
    data() {
        return {
            showTimeout: null,
            hideTimeout: null,
            active: false
        }
    },
    methods: {
        show() {
            this.resetDelayTimers();

            if (this.active) {
                return;
            }

            if (this.showDelay > 0) {
                this.showTimeout = setTimeout(() => {
                    this.active = true;
                }, this.showDelay);
            } else {
                this.active = true;
            }

        },
        hide() {
            this.resetDelayTimers();

            if (!this.active) {
                return;
            }

            if (this.hideDelay > 0) {
                this.hideTimeout = setTimeout(() => {
                    this.active = false;
                }, this.hideDelay);
            } else {
                this.active = false;
            }
        },
        resetDelayTimers() {
            if (this.showTimeout) {
                clearTimeout(this.showTimeout);
                this.showTimeout = null;
            }

            if (this.hideTimeout) {
                clearTimeout(this.hideTimeout);
                this.hideTimeout = null;
            }
        }
    }
}
