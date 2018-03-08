import {BaseModel}   from './BaseModel';
import CommonHelper from '@/utils/CommonHelper';

/**
 * @author Gani Georgiev <gani.georgiev@gmail.com>
 */
export class KeyModel extends BaseModel {
    /**
     * @inheritdoc
     */
    load(data = {}) {
        super.load(data);

        this.title  = !CommonHelper.isEmpty(data.title)  ? data.title  : '';
        this.token  = !CommonHelper.isEmpty(data.token)  ? data.token  : '';
        this.access = CommonHelper.isObject(data.access) ? data.access : {};
    }
}
