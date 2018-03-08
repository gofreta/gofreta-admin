import CommonHelper  from '@/utils/CommonHelper';
import {CFBaseModel} from '@/models/CFBaseModel';

/**
 * @author Gani Georgiev <gani.georgiev@gmail.com>
 */
export class CFChecklistModel extends CFBaseModel {
    /**
     * @inheritdoc
     */
    constructor(data = {}) {
        super(data);

        this.type = 'checklist';
    }

    /**
     * @inheritdoc
     */
    load(data = {}) {
        super.load(data);

        this.meta.options = CommonHelper.isArray(this.meta.options) ? this.meta.options : [];
    }
}
