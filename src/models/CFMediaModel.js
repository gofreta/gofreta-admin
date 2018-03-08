import {CFBaseModel} from '@/models/CFBaseModel';

/**
 * @author Gani Georgiev <gani.georgiev@gmail.com>
 */
export class CFMediaModel extends CFBaseModel {
    /**
     * @inheritdoc
     */
    constructor(data = {}) {
        super(data);

        this.type = 'media';
    }

    /**
     * @inheritdoc
     */
    load(data = {}) {
        super.load(data);

        this.meta.max = (this.meta.max > 0) ? this.meta.max << 0 : null;
    }
}
