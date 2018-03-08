import CommonHelper  from '@/utils/CommonHelper';
import {CFBaseModel} from '@/models/CFBaseModel';

export const MODE_DATE     = 'date';
export const MODE_DATETIME = 'datetime';

/**
 * @author Gani Georgiev <gani.georgiev@gmail.com>
 */
export class CFDateModel extends CFBaseModel {
    /**
     * @inheritdoc
     */
    constructor(data = {}) {
        super(data);

        this.type = 'date';
    }

    /**
     * @inheritdoc
     */
    load(data = {}) {
        super.load(data);

        this.meta.mode = CommonHelper.inArray(CFDateModel.metaTypes, this.meta.mode) ? this.meta.mode : MODE_DATETIME;
    }

    /**
     * Returns array with all available model meta types.
     *
     * @return {Array}
     */
    static get metaTypes() {
        return [MODE_DATE, MODE_DATETIME];
    }
}
