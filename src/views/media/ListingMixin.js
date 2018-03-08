import ApiClient    from '@/utils/ApiClient'
import CommonHelper from '@/utils/CommonHelper'

import {
    TYPE_IMAGE,
    TYPE_DOCUMENT,
    TYPE_VIDEO,
    TYPE_AUDIO,
    TYPE_OTHER,
    MediaModel
} from '@/models/MediaModel'

const typeOptions          = {'': 'All'};
typeOptions[TYPE_IMAGE]    = 'Images';
typeOptions[TYPE_DOCUMENT] = 'Documents';
typeOptions[TYPE_VIDEO]    = 'Videos';
typeOptions[TYPE_AUDIO]    = 'Audios';
typeOptions[TYPE_OTHER]    = 'Other';

export default {
    data() {
        return {
            loaded: false,
            itemsPerPage: 18,
            syncQueryParams: false,
            items: [],
            type: Object.keys(typeOptions)[0],
            typeOptions: typeOptions,
            sort: '-created',
            sortOptions: {
                '-created': 'Date DESC',
                'created':  'Date ASC',
                'title':    'Title ASC',
                '-title':   'Title DESC'
            },
            search: ''
        }
    },
    computed: {
        hasFilter: function () {
            return this.search.length || this.type.length;
        }
    },
    watch: {
        '$route.query.page'(val) {
            if (this.syncQueryParams) {
                this.loadItems(val);
            }
        },
        sort(val) {
            if (this.syncQueryParams) {
                this.$router.replace({ query: this.$extendQuery({ sort: val }) })
            }
        },
        type(val) {
            if (this.syncQueryParams) {
                this.$router.replace({ query: this.$extendQuery({ type: val }) })
            }
        },
    },
    methods: {
        /**
         * Loads and initialize component media items.
         *
         * @param {Number}   [page]
         * @param {Number}   [limit]
         * @param {Function} [callback]
         */
        loadItems(page = 1, limit, callback) {
            limit = limit || this.itemsPerPage;

            this.$showLoader();

            this.loaded = false;

            ApiClient.Media.getList(page, limit, this.getFilters()).then((response) => {
                this.$hideLoader();

                this.items = MediaModel.getInstances(response.data);

                // paging
                if (this.$refs.paging) {
                    this.$refs.paging.currentPage = response.headers['x-pagination-current-page'] << 0 || 1;
                    this.$refs.paging.totalPages  = response.headers['x-pagination-page-count'] << 0   || 1;
                }

                if (CommonHelper.isFunction(callback)) {
                    callback(response);
                }

                this.loaded = true;
            }).catch((err) => {
                this.loaded = true;

                this.$hideLoader();

                this.$errResponseHandler(err);
            });
        },

        /**
         * Resolves and returns array with the applied media filters.
         *
         * @return {Array}
         */
        getFilters() {
            var filters = {};

            if (this.sort) {
                filters['sort'] = this.sort;
            }

            if (this.type !== '') {
                filters['q[type]'] = this.type;
            }

            if (this.search.length) {
                filters['q[title]'] = '~' + this.search.replace('~', '') + '~';
            }

            return filters;
        },

        /**
         * Resets media filters and reload the media list.
         *
         * @param {Boolean} [useRouteParams]
         */
        resetList(useRouteParams = false) {
            this.search = '';
            this.type   = Object.keys(this.typeOptions)[0];
            this.sort   = Object.keys(this.sortOptions)[0];

            if (this.syncQueryParams && useRouteParams) {
                if (!CommonHelper.isEmpty(this.$route.query.q)) {
                    this.search = this.$route.query.q;
                }

                if (!CommonHelper.isEmpty(this.$route.query.type)) {
                    this.type = this.$route.query.type;
                }

                if (!CommonHelper.isEmpty(this.$route.query.sort)) {
                    this.sort = this.$route.query.sort;
                }
            }

            this.loadItems();
        }
    }
}
