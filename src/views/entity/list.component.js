import ApiClient         from '@/utils/ApiClient'
import CommonHelper      from '@/utils/CommonHelper'
import SettingsStorage   from '@/utils/SettingsStorage'
import {CollectionModel} from '@/models/CollectionModel'
import {EntityModel}     from '@/models/EntityModel'
import {LanguageModel}   from '@/models/LanguageModel'
// filter fields
import InputFilter  from './filters/InputFilter'
import SelectFilter from './filters/SelectFilter'
import DateFilter   from './filters/DateFilter'

export default {
    name: 'entities-list',
    components: {
        'input-filter':  InputFilter,
        'select-filter': SelectFilter,
        'date-filter':   DateFilter
    },
    props: {
        limit: {
            type: Number,
            default: 15
        },
        syncQueryPage: {
            type: Boolean,
            default: false
        },
        cid: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            collection:       new CollectionModel(),
            showFilters:      false,
            hasActiveFilters: false,
            languages:        [],
            activeLocale:     '',
            entities:         [],
            listingCols: [
                {type: 'prop', label: 'ID', name: 'id', meta: {filter_alias: '_id'}},
                {type: 'prop', label: 'Status', name: 'status', meta: {}},
                {type: 'prop', label: 'Date Modified', name: 'modified', meta: {}}
            ],
            selectedCols: [], // `type.name` listing cols array
        }
    },
    watch: {
        'activeLocale': function (val) {
            SettingsStorage.setItem('locale', val);
        },
        '$route.query.page': function (val) {
            if (this.syncQueryPage) {
                this.loadEntities(val);
            }
        }
    },
    computed: {
        orderedActiveListingCols() {
            var result = [];

            for (let i in this.listingCols) {
                let identifier = (this.listingCols[i].type + '.' + this.listingCols[i].name);

                if (CommonHelper.inArray(this.selectedCols, identifier)) {
                    result.push(this.listingCols[i]);
                }
            }

            return result;
        }
    },
    methods: {
        /**
         * Inializes all required compoment items.
         */
        init() {
            this.loadLanguages();
            this.loadCollection();
            this.loadEntities();
        },

        /**
         * Loads and initializes component collection model.
         *
         * @param {String}   [cid]
         * @param {Function} [callback]
         */
        loadCollection(cid, callback) {
            cid = cid || this.cid;

            this.$showLoader();

            ApiClient.Collection.getOne(cid).then((response) => {
                this.collection.load(response.data);

                var fieldCols     = [];
                var defaultFields = [];

                // resolve listing fields
                var listingFields = this.collection.getListingFields();
                if (listingFields.length) {
                    for (var i in listingFields) {
                        fieldCols.push({
                            type:  'field',
                            label: listingFields[i].label,
                            name:  listingFields[i].key,
                            meta:  listingFields[i]
                        });

                        defaultFields.push('field.' + listingFields[i].key);
                    }
                } else {
                    defaultFields.push('prop.id');
                }

                defaultFields.push('prop.status');
                defaultFields.push('prop.modified');

                this.listingCols = fieldCols.concat(this.listingCols);

                this.selectedCols = SettingsStorage.getItem(this.collection.id, defaultFields);

                this.$setDocumentTitle(this.collection.title);

                if (CommonHelper.isFunction(callback)) {
                    callback(response.data);
                }

                this.$emit('collection-loaded', response.data);

                this.$hideLoader();
            }).catch((err) => {
                this.$hideLoader();

                this.$errResponseHandler(err);
            });
        },

        /**
         * Loads and initializes component language models.
         *
         * @param {Function} [callback]
         */
        loadLanguages(callback) {
            this.$showLoader();

            ApiClient.Language.getList(1, 99).then((response) => {
                this.languages = LanguageModel.getInstances(response.data);

                if (this.languages[0]) {
                    this.activeLocale = SettingsStorage.getItem('locale', this.languages[0].locale);
                }

                if (CommonHelper.isFunction(callback)) {
                    callback(response);
                }

                this.$emit('languages-loaded', response.data);

                this.$hideLoader();
            }).catch((err) => {
                this.$hideLoader();

                this.$errResponseHandler(err);
            });
        },

        /**
         * Loads and initializes component entity models.
         *
         * @param {Number}   [page]
         * @param {Number}   [limit]
         * @param {Function} [callback]
         */
        loadEntities(page = 1, limit, callback) {
            limit = limit || this.limit;

            this.$showLoader();

            var filterQueryParams = this.getFilterQueryParams();

            ApiClient.Entity.getList(this.cid, page, limit, filterQueryParams).then((response) => {
                this.entities = EntityModel.getInstances(response.data);

                if (this.$refs.paging) {
                    this.$refs.paging.currentPage = response.headers['x-pagination-current-page'] << 0 || 1;
                    this.$refs.paging.totalPages  = response.headers['x-pagination-page-count'] << 0   || 1;

                    this.$emit('entities-loaded', response.data, this.$refs.paging.currentPage);
                }

                if (CommonHelper.isFunction(callback)) {
                    callback(response.data);
                }

                this.$hideLoader();
            }).catch((err) => {
                this.$hideLoader();

                this.$errResponseHandler(err);
            });
        },

        /**
         * Updates selected listing fields storage.
         */
        updateSelectedColsStorage() {
            SettingsStorage.setItem(this.collection.id, this.selectedCols);
        },

        /**
         * Toggles table option dropdown.
         */
        toggleTableOptions() {
            this.$refs.tableOptions.toggle();
        },

        /**
         * Toggles table filter panel.
         */
        toggleFilter() {
            if (this.showFilters) {
                this.showFilters = false;

                this.resetFilters();
            } else {
                this.showFilters = true;
            }
        },

        /**
         * Handles filter field change event.
         */
        onFilterChange() {
            this.loadEntities()
        },

        /**
         * Return all filter field compoments.
         *
         * @return {Array}
         */
        getFilterRefs() {
            var result = [];

            if (CommonHelper.isArray(this.$refs.filters)) {
                for (let i in this.$refs.filters) {
                    result.push(this.$refs.filters[i]);
                }
            }

            return result;
        },

        /**
         * Resets all filter fields and reloads the table list.
         */
        resetFilters() {
            var filters = this.getFilterRefs();

            for (let i in filters) {
                if (CommonHelper.isFunction(filters[i].reset)) {
                    filters[i].reset();
                }
            }

            this.hasActiveFilters = false;

            this.loadEntities();
        },

        /**
         * Returns and resolve filter field values.
         *
         * @return {Object}
         */
        getFilterQueryParams() {
            var filters = this.getFilterRefs();
            var result = {};

            for (let i in filters) {
                result = Object.assign(result, filters[i].export());
            }

            if (CommonHelper.isEmpty(result)) {
                this.hasActiveFilters = false;
            } else {
                this.hasActiveFilters = true;
            }

            return result;
        }
    }
}
