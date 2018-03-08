import {CFBaseModel} from '@/models/CFBaseModel';

/**
 * @author Gani Georgiev <gani.georgiev@gmail.com>
 */
export class CFRelationModel extends CFBaseModel {
    /**
     * @inheritdoc
     */
    constructor(data = {}) {
        super(data);

        this.type = 'relation';
    }

    /**
     * @inheritdoc
     */
    load(data = {}) {
        super.load(data);

        this.meta.max           = (this.meta.max > 0) ? this.meta.max << 0 : null;
        this.meta.collection_id = this.meta.collection_id || null;
    }
}
