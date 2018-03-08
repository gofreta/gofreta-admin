import CommonHelper from '@/utils/CommonHelper';
import {CFBaseModel} from '@/models/CFBaseModel';

/**
 * @author Gani Georgiev <gani.georgiev@gmail.com>
 */
export class CFSelectModel extends CFBaseModel {
    /**
     * @inheritdoc
     */
    constructor(data = {}) {
        super(data);

        this.type = 'select';
    }

    /**
     * @inheritdoc
     */
    load(data = {}) {
        super.load(data);

        this.meta.options = CommonHelper.isArray(this.meta.options) ? this.meta.options : [];
    }

    /**
     * Adds single meta option.
     *
     * @param {String} name
     * @param {String} value
     */
    addOption(name = '', value = '') {
        // string cast
        name  = name + '';
        value = value + '';

        this.meta.options.push({
            name:  name,
            value: value
        });
    }

    /**
     * Removes single meta option by its array index.
     *
     * @param {Number} index
     */
    removeOption(index) {
        if (CommonHelper.isEmpty(this.meta.options)) {
            return;
        }

        this.meta.options.splice(index, 1);
    }
}
