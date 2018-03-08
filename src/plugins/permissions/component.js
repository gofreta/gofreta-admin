import ApiClient         from '@/utils/ApiClient'
import CommonHelper      from '@/utils/CommonHelper'
import {CollectionModel} from '@/models/CollectionModel'

const baseGroups = {
    "user":       ["index", "view", "create", "update", "delete"],
    "key":        ["index", "view", "create", "update", "delete"],
    "media":      ["index", "view", "upload", "update", "delete"],
    "language":   ["create", "update", "delete"],
    "collection": ["index", "view", "create", "update", "delete"]
}

/**
 * Permissions component settings.
 *
 * @author Gani Georgiev <gani.georgiev@gmail.com>
 */
export default {
    name: 'permissions',
    props: {
        exclude: {
            type: Array,
            default: function () {
                return [];
            }
        },
        initSelected: {
            type: Object,
            default: function () {
                return {};
            }
        }
    },
    data() {
        return {
            isReady:     false,
            groups:      {},
            selected:    {},
            collections: []
        }
    },
    mounted() {
        this.initializeGroups();
    },
    methods: {
        initializeSelected() {
            for (let group in this.groups) {
                this.selected[group] = [];
            }

            this.selected = Object.assign({}, this.selected, this.initSelected || {});
        },
        initializeGroups() {
            this.isReady = false;

            for (let group in baseGroups) {
                if (!CommonHelper.inArray(this.exclude, group)) {
                    this.groups[group] = baseGroups[group].slice(0);
                }
            }

            this.loadCollections((collections) => {
                var actions = ["index", "view", "update", "create", "delete"];
                for (let i in collections) {
                    if (!CommonHelper.inArray(this.exclude, collections[i].id)) {
                        this.groups[collections[i].id] = actions.slice(0);
                    }
                }

                this.initializeSelected();

                this.$emit('ready');

                this.isReady = true;
            });
        },
        /**
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        loadCollections(callback) {
            ApiClient.Collection.getList(1, 999).then((response) => {
                this.collections = CollectionModel.getInstances(response.data);

                if (CommonHelper.isFunction(callback)) {
                    callback(this.collections);
                }
            }).catch((err) => {
                this.$errResponseHandler(err);
            });
        },
        toggleAll(group) {
            if (
                CommonHelper.isArray(this.groups[group]) &&
                CommonHelper.isArray(this.selected[group])
            ) {
                if (this.selected[group].length == this.groups[group].length) {
                    // unset all
                    this.selected[group] = [];
                } else {
                    // set all
                    this.selected[group] = this.groups[group].slice(0);
                }
            }

            // reactivity fix
            this.selected = Object.assign({}, this.selected);
        },
        resolveGroupName(group) {
            // check if is collection id
            for (let i in this.collections) {
                if (this.collections[i].id == group) {
                    return this.collections[i].title;
                }
            }

            return this.$humanize(group);
        },
        selectActions(actions) {
            for (let group in this.selected) {
                for (let i in actions) {
                    if (
                        !CommonHelper.inArray(actions[i], this.selected[group]) && // is not selected already
                        CommonHelper.inArray(actions[i], this.groups[group])       // is supported
                    ) {
                        this.selected[group].push(actions[i]);
                    }
                }
            }

            // reactivity fix
            this.selected = Object.assign({}, this.selected);
        },
        getSelected() {
            return Object.assign({}, this.selected);
        }
    }
}
