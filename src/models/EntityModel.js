import {BaseModel}   from './BaseModel';
import CommonHelper from '@/utils/CommonHelper';

export const STATUS_ACTIVE   = 'active';
export const STATUS_INACTIVE = 'inactive';

/**
 * @author Gani Georgiev <gani.georgiev@gmail.com>
 */
export class EntityModel extends BaseModel {
    /**
     * @inheritdoc
     */
    load(data = {}) {
        super.load(data);

        this.collection_id = !CommonHelper.isEmpty(data.collection_id)               ? data.collection_id : '';
        this.data          = CommonHelper.isObject(data.data)                        ? data.data          : {};
        this.status        = CommonHelper.inArray(EntityModel.statuses, data.status) ? data.status        : STATUS_ACTIVE;
    }

    /**
     * Safely access and return single model field value.
     *
     * @param  {String} fieldKey
     * @param  {String} locale
     * @param  {Mixed}  defaultVal
     * @return {Mixed}
     */
    getFieldValue(fieldKey, locale, defaultVal = null) {
        return CommonHelper.getNestedVal(this.data, (locale + '.' + fieldKey), defaultVal);
    }

    /**
     * Returns array with all available model statuses.
     *
     * @return {Array}
     */
    static get statuses() {
        return [STATUS_ACTIVE, STATUS_INACTIVE];
    }
}
