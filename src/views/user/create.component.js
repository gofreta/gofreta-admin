import ApiClient   from '@/utils/ApiClient'
import Permissions from '@/plugins/permissions/Permissions'

export default {
    name: 'user-create',
    components: {
        'permissions-list': Permissions
    },
    data() {
        return {
            form: {
                username:         '',
                email:            '',
                status:           'active', // hidden
                old_password:     '',
                password:         '',
                password_confirm: '',
                access:           {}
            }
        }
    },
    mounted() {
        this.$setDocumentTitle('Users - Create');
    },
    methods: {
        /**
         * Takes care for user create form submission.
         */
        onSubmit() {
            this.$showLoader();

            var formData     = Object.assign({}, this.form);
            var accessRights = this.$refs.accessRightsList.getSelected();
            formData.access  = Object.assign({}, formData.access, accessRights);

            ApiClient.User.create(formData).then((response) => {
                this.$hideLoader();

                this.$router.replace({ name: 'user-index' });

                this.$notify('Successfully added new user.', 'success');
            }).catch((err) => {
                this.$hideLoader();

                this.$errResponseHandler(err);
            });
        }
    }
}
