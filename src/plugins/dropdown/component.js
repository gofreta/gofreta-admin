/**
 * Dropdown container component settings.
 *
 * @author Gani Georgiev <gani.georgiev@gmail.com>
 */
export default {
    name: 'dropdown',
    data() {
        return {
            active: false
        }
    },
    created() {
        document.addEventListener('click', this.outsideClick);
    },
    destroyed() {
        document.removeEventListener('click', this.outsideClick);
    },
    methods: {
        hide() {
            this.active = false;
        },
        show() {
            this.active = true;
        },
        isActive() {
            return this.active;
        },
        toggle() {
            if (this.isActive()) {
                this.hide();
            } else {
                this.show();
            }
        },
        outsideClick(clickEvent) {
            if (this.isActive()) {
                this.hide();
            }
        }
    }
}
