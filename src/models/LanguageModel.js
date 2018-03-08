import {BaseModel}   from './BaseModel';
import CommonHelper from '@/utils/CommonHelper';

/**
 * @author Gani Georgiev <gani.georgiev@gmail.com>
 */
export class LanguageModel extends BaseModel {
    /**
     * @inheritdoc
     */
    load(data = {}) {
        super.load(data);

        this.locale = !CommonHelper.isEmpty(data.locale) ? data.locale : '';
        this.title  = !CommonHelper.isEmpty(data.title)  ? data.title  : '';
    }
}
