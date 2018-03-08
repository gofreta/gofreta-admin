import {CFBaseModel} from '@/models/CFBaseModel';

/**
 * @author Gani Georgiev <gani.georgiev@gmail.com>
 */
export class CFPlainModel extends CFBaseModel {
    /**
     * @inheritdoc
     */
    constructor(data = {}) {
        super(data);

        this.type = 'plain';
    }
}
