import {CFBaseModel} from '@/models/CFBaseModel';

/**
 * @author Gani Georgiev <gani.georgiev@gmail.com>
 */
export class CFSwitchModel extends CFBaseModel {
    /**
     * @inheritdoc
     */
    constructor(data = {}) {
        super(data);

        this.type    = 'switch';
        this.default = true;
    }

    /**
     * @inheritdoc
     */
    load(data = {}) {
        super.load(data);

        this.default = this.default ? true : false;
    }
}
