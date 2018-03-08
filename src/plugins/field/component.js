import CommonHelper  from '@/utils/CommonHelper'
import { events }    from './events'

var lastErrors     = {};
var lastErrorTrack = {};

/**
 * Field wrapper component settings.
 *
 * @author Gani Georgiev <gani.georgiev@gmail.com>
 */
export default {
    name: 'form-field',
    props: {
        name: {
            type: String,
            required: true
        },
        track: {}
    },
    data() {
        return {
            error: '',
        }
    },
    watch: {
        track(val) {
            this.$nextTick(() => {
                this.checkLastErrorVal(this.name);
            });
        }
    },
    mounted() {
        events.$on('registerFieldErrors', this.extractError);
    },
    beforeDestroy() {
        lastErrors     = {};
        lastErrorTrack = {};
    },
    methods: {
        extractError(errors) {
            lastErrors = Object.assign({}, errors);
            lastErrorTrack[this.name] = this.track;

            this.error = CommonHelper.getNestedVal(errors, this.name, '');
        },
        checkLastErrorVal(name) {
            name = name || this.name;

            if (this.track == CommonHelper.getNestedVal(lastErrorTrack, name, '')) {
                this.error = CommonHelper.getNestedVal(lastErrors, name, '')
            } else {
                this.error = '';
            }
        }
    }
}
