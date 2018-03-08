import {BaseModel}   from './BaseModel';
import CommonHelper from '@/utils/CommonHelper';

/**
 * @author Gani Georgiev <gani.georgiev@gmail.com>
 */
export class UserModel extends BaseModel {
    /**
     * @inheritdoc
     */
    load(data = {}) {
        super.load(data);

        this.username = !CommonHelper.isEmpty(data.username) ? data.username : '';
        this.email    = !CommonHelper.isEmpty(data.email)    ? data.email    : '';
        this.status   = !CommonHelper.isEmpty(data.status)   ? data.status   : '';
        this.access   = CommonHelper.isObject(data.access)   ? data.access   : {};
    }
}
