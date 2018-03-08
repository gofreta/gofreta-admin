/**
 * Commonly used global static helper methods.
 *
 * @author Gani Georgiev <gani.georgiev@gmail.com>
 */
export default class CommonHelper {
    /**
     * @param  {Mixed} value
     * @return {Boolean}
     */
    static isObject (value) {
        return value !== null && typeof value === 'object' && value.constructor !== Array;
    }

    /**
     * @param  {Mixed} value
     * @return {Boolean}
     */
    static isArray (value) {
        return value !== null && typeof value === 'object' && value.constructor === Array;
    }

    /**
     * @param  {Mixed} value
     * @return {Boolean}
     */
    static isFunction (value) {
        return value !== null && typeof value === 'function';
    }

    /**
     * @param  {Mixed}  value
     * @return {Boolean}
     */
    static isBoolean (value) {
        return typeof value === 'boolean';
    }

    /**
     * @param  {Mixed}  value
     * @return {Boolean}
     */
    static isString (value) {
        return typeof value === 'string';
    }

    /**
     * Checks whether a value is empty. The following values are considered as empty:
     * - null
     * - undefined
     * - empty string
     * - empty array
     * - empty object
     *
     * @param  {Mixed} value
     * @return {Boolean}
     */
    static isEmpty (value) {
        return (
            (value === '') ||
            (value === null) ||
            (typeof value === 'undefined') ||
            (this.isArray(value) && value.length === 0) ||
            (this.isObject(value) && Object.keys(value).length === 0)
        );

        return false;
    }

    /**
     * Generates random string (suitable for elements id and Vue keys).
     *
     * @param  {Number} length Returned string length (default 10)
     * @return {String}
     */
    static randomString (length) {
        length = length || 10;

        var result   = '';
        var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < length; i++) {
            result += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        }

        return result;
    }

    /**
     * Very simple and robust string slugify helper.
     *
     * @param  {String} str
     * @param  {String} delimiter
     * @param  {Array}  preserved
     * @return {String}
     */
    static slugify (str, delimiter = '_', preserved = ['.', '=', '-']) {
        if (str === '') {
            return '';
        }

        // special characters
        var specialCharsMap = {
            'a':   /а|à|á|å|â/gi,
            'b':   /б/gi,
            'c':   /ц|ç/gi,
            'd':   /д/gi,
            'e':   /е|è|é|ê|ẽ|ë/gi,
            'f':   /ф/gi,
            'g':   /г/gi,
            'h':   /х/gi,
            'i':   /й|и|ì|í|î/gi,
            'j':   /ж/gi,
            'k':   /к/gi,
            'l':   /л/gi,
            'm':   /м/gi,
            'n':   /н|ñ/gi,
            'o':   /о|ò|ó|ô|ø/gi,
            'p':   /п/gi,
            'q':   /я/gi,
            'r':   /р/gi,
            's':   /с/gi,
            't':   /т/gi,
            'u':   /ю|ù|ú|ů|û/gi,
            'v':   /в/gi,
            'w':   /в/gi,
            'x':   /ь/gi,
            'y':   /ъ/gi,
            'z':   /з/gi,
            'ae':  /ä|æ/gi,
            'oe':  /ö/gi,
            'ue':  /ü/gi,
            'Ae':  /Ä/gi,
            'Ue':  /Ü/gi,
            'Oe':  /Ö/gi,
            'ss':  /ß/gi,
            'and': /&/gi
        };

        // replace special characters
        for (var k in specialCharsMap){
            str = str.replace(specialCharsMap[k], k);
        }

        return str.toLowerCase()
            .trim()
            .replace(new RegExp('[' + preserved.join('') + ']', 'g'), ' ') // replace preserved characters with spaces
            .replace(/[^\w\ ]/gi, '')                                      // replaces all non-alphanumeric with empty string
            .replace(/\s+/g, delimiter);                                   // collapse whitespaces and replace with `delimiter`
    }

    /**
     * Safely access nested object/array key with dot-notation.
     *
     * @example
     * ```javascript
     * var myObj = {a: {b: {c: 3}}}
     * this.getNestedVal(myObj, 'a.b.c');       // returns 3
     * this.getNestedVal(myObj, 'a.b.c.d');     // returns null
     * this.getNestedVal(myObj, 'a.b.c.d', -1); // returns -1
     * ```
     *
     * @param  {Object|Array} obj
     * @param  {String}       keys
     * @param  {Mixed}        defaultVal
     * @param  {String}       delimiter
     * @return {Mixed}
     */
    static getNestedVal (obj, keys, defaultVal = null, delimiter = '.') {
        var result = obj;
        var parts  = keys.split(delimiter);

        for (var i = 0; i < parts.length; i++) {
            if (typeof result[parts[i]] === 'undefined') {
                return defaultVal;
            }

            result = result[parts[i]];
        }

        return result;
    }

    /**
     * Loosely checks if value exists in an array.
     *
     * @param  {Array}  arr
     * @param  {String} value
     * @return {Boolean}
     */
    static inArray (arr, value) {
        for (var i in arr) {
            if (arr[i] == value) {
                return true;
            }
        }

        return false;
    }

    /**
     * Returns the first matched element of array object by its key.
     *
     * @example
     * ```javascript
     * var arr = [{id: 1}, {id: 2}]
     * var obj = this.findArrayObject(arr, 'id', 1);
     * console.log(obj); // {id: 1}
     * ```
     *
     * @param {Array}  arr
     * @param {String} key
     * @param {String} value
     * @param {Null|Array}
     */
    static findArrayObject(arr, key, value) {
        for (var i in arr) {
            if (arr[i][key] == value) {
                return arr[i];
            }
        }

        return null;
    }

    /**
     * Deletes single element of array object by its key.
     *
     * @example
     * ```javascript
     * var arr = [{id: 1}, {id: 2}]
     * this.deleteArrayObject(arr, 'id', 1);
     * console.log(arr); // [{id: 2}]
     * ```
     *
     * @param {Array}  arr
     * @param {String} key
     * @param {String} value
     * @param {Array}
     */
    static deleteArrayObject(arr, key, value) {
        for (var i in arr) {
            if (arr[i][key] == value) {
                arr.splice(i, 1);

                break;
            }
        }

        return arr;
    }

    /**
     * Replaces underscores with spaces and uppercase the first character of a string.
     *
     * @example
     * ```javascript
     * var result = this.humanize('lorem_ipsum dolor sit_amet');
     * console.log(result); // 'Lorem ipsum dolor sit amet'
     * ```
     *
     * @param  {String} str
     * @param  {String} [delimiter]
     * @return {String}
     */
    static humanize(str, delimiter = '_') {
        var result = str.split(delimiter).join(' ');

        return result.charAt(0).toUpperCase() + result.slice(1);
    }
}
