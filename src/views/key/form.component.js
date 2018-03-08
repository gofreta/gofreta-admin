import Permissions from '@/plugins/permissions/Permissions'
import {KeyModel}  from '@/models/KeyModel'

export default {
	name: 'key-form',
    components: {
        'permissions-list': Permissions
    },
	props: {
        scenario: {
			type: String,
            default: 'create'
        },
        data: {
            type: KeyModel
		}
	},
    data() {
        return {
        	model: new KeyModel
        }
    },
    mounted() {
    	if (this.data) {
    		this.load(this.data.export());
    	}
    },
    methods: {
        /**
         * "Proxy" for the compoment `model.load()`.
         *
         * @param  {Object} data
         */
    	load(data = {}) {
    		this.model.load(data)
    	},

        /**
         * Prepares key form for submission.
         */
        onSubmit() {
            var modelData = this.model.export();
            var accessRights = this.$refs.accessRightsList.getSelected();

            modelData.access = Object.assign({}, modelData.access, accessRights);

        	this.$emit('submit', modelData);
        }
    }
}
