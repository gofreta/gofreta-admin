import ApiClient    from '@/utils/ApiClient'
import AuthHelper   from '@/utils/AuthHelper'
import CommonHelper from '@/utils/CommonHelper'
import Permissions  from '@/plugins/permissions/Permissions'
import {UserModel}  from '@/models/UserModel'

export default {
    name: 'user-update',
    components: {
        'permissions-list': Permissions
    },
    data() {
        return {
            user: new UserModel,
            changePassword: false,
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
    watch: {
        changePassword: function (val) {
            if (!val) {
                this.form.old_password     = '';
                this.form.password         = '';
                this.form.password_confirm = '';
            }
        }
    },
    mounted() {
        this.$setDocumentTitle('Users - Update');

        this.loadUser(this.$route.params.id);
    },
    methods: {
        /**
         * Loads and initializes component user model.
         *
         * @param {String}   id
         * @param {Function} [callback]
         */
        loadUser(id, callback) {
            this.$refs.inlineLoader.show();

            ApiClient.User.getOne(id).then((response) => {
                this.user.load(response.data);

                this.loadForm(this.user)

                if (CommonHelper.isFunction(callback)) {
                    callback(this.user);
                }

                this.$refs.inlineLoader.hide();
            }).catch((err) => {
                this.$refs.inlineLoader.hide();

                if (err.response && err.response.status == 404) {
                    this.$router.replace({ name: 'user-index' });
                }

                this.$errResponseHandler(err);
            });
        },

        /**
         * Loads `userData` into component's form.
         *
         * @param {Object} user
         */
        loadForm(userData) {
            this.form.username = userData.username;
            this.form.email    = userData.email;
            this.form.status   = userData.status;
            this.form.access   = userData.access;
        },

        /**
         * Takes care for user update form submission.
         */
        onSubmit() {
            this.$showLoader();

            var formData     = Object.assign({}, this.form);
            var accessRights = this.$refs.accessRightsList.getSelected();
            formData.access  = Object.assign({}, formData.access, accessRights);

            ApiClient.User.update(this.user.id, formData).then((response) => {
                this.$hideLoader();

                this.$router.replace({ name: 'user-index' });

                // renew current user data
                var authData = AuthHelper.getData();
                if (authData.user && authData.user.id == response.data.id) {
                    AuthHelper.setData(authData.token, response.data, authData.exp);
                }

                this.$notify('Successfully updated user.', 'success');
            }).catch((err) => {
                this.$hideLoader();

                this.$errResponseHandler(err);
            });
        }
    }
}
