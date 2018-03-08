import {BaseModel}   from './BaseModel';
import CommonHelper from '@/utils/CommonHelper';

/**
 * @author Gani Georgiev <gani.georgiev@gmail.com>
 */
export class CollectionModel extends BaseModel {
    /**
     * @inheritdoc
     */
    load(data = {}) {
        super.load(data);

        // generic
        this.name   = !CommonHelper.isEmpty(data.name)  ? data.name   : '';
        this.title  = !CommonHelper.isEmpty(data.title) ? data.title  : '';
        this.fields = CommonHelper.isArray(data.fields) ? data.fields : [];

        // hooks
        this.create_hook = data.create_hook || '';
        this.update_hook = data.update_hook || '';
        this.delete_hook = data.delete_hook || '';
    }

    /**
     * Returns list with fields suitable for listing.
     *
     * @return {Array}
     */
    getListingFields() {
        var result = [];

        for (let i in this.fields) {
            if (
                this.fields[i].type == 'plain' ||
                this.fields[i].type == 'switch' ||
                this.fields[i].type == 'date'
            ) {
                result.push(this.fields[i]);
            }
        }

        return result;
    }

    /**
     * Checks whether the collection has field with specific `key` value.
     *
     * @param  {String}  key
     * @param  {Number}  excludeIndex
     * @return {Boolean}
     */
    hasFieldKey(key, excludeIndex) {
        for (var i = 0; i < this.fields.length; i++) {
            if (excludeIndex >= 0 && excludeIndex == i) {
                continue;
            }

            if (this.fields[i].key === key) {
                return true;
            }
        }

        return false;
    }

    /**
     * Returns specific field array index by its `key` property.
     * Returns `-1` if field with such key doesn't exist.
     *
     * @param  {String} key
     * @return {Numbert}
     */
    getFieldIndexByKey(key) {
        for (var i = 0; i < this.fields.length; i++) {
            if (this.fields[i].key === key) {
                return i;
            }
        }

        return -1;
    }

    /**
     * Removes field element by its `key` property.
     *
     * @param {String} key
     */
    removeFieldByKey(key) {
        var index = this.getFieldIndexByKey(key);

        if (index >= 0) {
            this.fields.splice(index, 1);
        }
    }

    /**
     * Finds field element by its `key` property.
     *
     * @param {String} key
     */
    getFieldByKey(key) {
        for (var i = 0; i < this.fields.length; i++) {
            if (this.fields[i].key === key) {
                return this.fields[i];
            }
        }

        return null;
    }

    /**
     * Ensures that each field has a unique key by
     * concatenating an iterator to each duplicated key.
     */
    fixDuplicatedFieldKeys() {
        var field = {};
        for (let i in this.fields) {
            field = this.fields[i];

            if (this.hasFieldKey(field.key, i)) {
                let dupCounter = 2;

                while (this.hasFieldKey(field.key + '_' + dupCounter, i)) {
                    dupCounter++;
                }

                field.key += ('_' + dupCounter);
            }
        }
    }
}
