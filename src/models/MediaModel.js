import {BaseModel}   from './BaseModel';
import CommonHelper from '@/utils/CommonHelper';

export const TYPE_IMAGE    = 'image';
export const TYPE_DOCUMENT = 'doc';
export const TYPE_VIDEO    = 'video';
export const TYPE_AUDIO    = 'audio';
export const TYPE_OTHER    = 'other';

/**
 * @author Gani Georgiev <gani.georgiev@gmail.com>
 */
export class MediaModel extends BaseModel {
    /**
     * @inheritdoc
     */
    load(data = {}) {
        super.load(data);

        this.title       = !CommonHelper.isEmpty(data.title)                 ? data.title       : '';
        this.path        = !CommonHelper.isEmpty(data.path)                  ? data.path        : '';
        this.description = !CommonHelper.isEmpty(data.description)           ? data.description : '';
        this.type        = CommonHelper.inArray(MediaModel.types, data.type) ? data.type        : TYPE_OTHER;
    }

    /**
     * Return list with all valid model types.
     *
     * @return {Array}
     */
    static get types() {
        return [TYPE_IMAGE, TYPE_DOCUMENT, TYPE_VIDEO, TYPE_AUDIO, TYPE_OTHER];
    }
}
