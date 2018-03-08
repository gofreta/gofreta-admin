var pagesBreakLimit = 8;

/**
 * Paging component settings.
 *
 * @author Gani Georgiev <gani.georgiev@gmail.com>
 */
export default {
    name: 'paging',
    props: {
        updateRoute: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            currentPage: 1,
            totalPages: 1,
            pages: []
        }
    },
    watch: {
        currentPage(val) {
            this.loadPages();

            this.updateRouteHandler(val);
        },
        totalPages(val) {
            this.loadPages();
        }
    },
    methods: {
        updateRouteHandler(val) {
            if (
                this.updateRoute &&
                this.$route.query.page != val
            ) {
                this.$nextTick(function () {
                    this.$router.push({
                        name:  this.$route.name,
                        hash:  this.$route.hash,
                        query: Object.assign({}, this.$route.query, {
                            page: val
                        })
                    });
                });
            }
        },
        changePage(val) {
            this.updateRouteHandler(val);

            this.$emit('change', val);
        },
        loadPages() {
            var result   = [];
            var prevPage = (this.currentPage || 1) - 1;
            var nextPage = (this.currentPage || 1) + 1;

            if (this.totalPages <= pagesBreakLimit) {
                for (var i = 1; i <= this.totalPages; i++) {
                    result.push(i);
                }
            } else {
                result.push(1);

                if (prevPage > 1) {
                    if (prevPage > 2) {
                        result.push(null);
                    }

                    result.push(prevPage);
                }

                if (this.currentPage != 1 && this.currentPage != this.totalPages) {
                    result.push(this.currentPage);
                }

                if (nextPage < this.totalPages) {
                    result.push(nextPage);

                    if (nextPage < this.totalPages - 1) {
                        result.push(null);
                    }
                }

                if (this.totalPages > 1) {
                    result.push(this.totalPages);
                }
            }

            this.pages = result;
        }
    }
}
