import CommonHelper from '@/utils/CommonHelper';
import {CFBaseModel} from '@/models/CFBaseModel';

export const MODE_RICH   = 'rich';
export const MODE_SIMPLE = 'simple';

/**
 * @author Gani Georgiev <gani.georgiev@gmail.com>
 */
export class CFEditorModel extends CFBaseModel {
    /**
     * @inheritdoc
     */
    constructor(data = {}) {
        super(data);

        this.type = 'editor';
    }

    /**
     * @inheritdoc
     */
    load(data = {}) {
        super.load(data);

        this.meta.mode = CommonHelper.inArray(CFEditorModel.metaModes, this.meta.mode) ? this.meta.mode : MODE_RICH;
    }

    /**
     * Returns array with all available model meta modes.
     *
     * @return {Array}
     */
    static get metaModes() {
        return [MODE_RICH, MODE_SIMPLE];
    }
}
