import CommonHelper from '@/utils/CommonHelper';

/**
 * CFBaseModel class intended to be inherited by all collection field models.
 *
 * @author Gani Georgiev <gani.georgiev@gmail.com>
 */
export class CFBaseModel {
    /**
     * @param {Object} [data]
     */
    constructor(data = {}) {
        this.load(data);
    }

    /**
     * Loads and normalizes common collection field model properties.
     *
     * @param {Object} [data]
     */
    load(data = {}) {
        this.key          = !CommonHelper.isEmpty(data.key)          ? data.key                           : '';
        this.label        = !CommonHelper.isEmpty(data.label)        ? data.label                         : '';
        this.required     = !CommonHelper.isEmpty(data.required)     ? (data.required ? true : false)     : false;
        this.unique       = !CommonHelper.isEmpty(data.unique)       ? (data.unique ? true : false)       : false;
        this.multilingual = !CommonHelper.isEmpty(data.multilingual) ? (data.multilingual ? true : false) : true;
        this.default      = !CommonHelper.isEmpty(data.default)      ? data.default                       : '';
        this.meta         = !CommonHelper.isEmpty(data.meta)         ? data.meta                          : {};
    }

    /**
     * Exports all model properties as a new plain object.
     *
     * @return {Object}
     */
    export() {
        return Object.assign({}, this);
    }
}
