import CommonHelper from '@/utils/CommonHelper';

/**
 * BaseModel class intended to be inherited by all API models (eg. user, media, etc.).
 *
 * @author Gani Georgiev <gani.georgiev@gmail.com>
 */
export class BaseModel {
    /**
     * @param {Object} [data]
     */
    constructor(data = {}) {
        this.load(data);
    }

    /**
     * Loads and normalize model properties.
     *
     * @param {Object} [data]
     */
    load(data = {}) {
        this.id       = !CommonHelper.isEmpty(data.id)       ? data.id       : null;
        this.created  = !CommonHelper.isEmpty(data.created)  ? data.created  : null;
        this.modified = !CommonHelper.isEmpty(data.modified) ? data.modified : null;
    }

    /**
     * Exports all model properties as a new plain object.
     *
     * @return {Object}
     */
    export() {
        return Object.assign({}, this);
    }

    /**
     * Returns new model instances from data items array.
     *
     * @param  {Array} items
     * @return {Array}
     */
    static getInstances(items) {
    	var result = [];

    	for (let i in items) {
    		result.push(new this(items[i]));
    	}

    	return result;
    }
}
