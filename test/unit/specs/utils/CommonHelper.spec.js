import CommonHelper from '@/utils/CommonHelper'

describe('CommonHelper', () => {
    describe('isObject()', () => {
        it('should results to true', () => {
            assert.isTrue(CommonHelper.isObject({}));
            assert.isTrue(CommonHelper.isObject({"test": "test"}));
        });

        it('should results to false', () => {
            assert.isFalse(CommonHelper.isObject());
            assert.isFalse(CommonHelper.isObject('test'));
            assert.isFalse(CommonHelper.isObject(123));
            assert.isFalse(CommonHelper.isObject(null));
            assert.isFalse(CommonHelper.isObject([1, 2, 3]));
            assert.isFalse(CommonHelper.isObject(function(){}));
        });
    });

    describe('isArray()', () => {
        it('should results to true', () => {
            assert.isTrue(CommonHelper.isArray([]));
            assert.isTrue(CommonHelper.isArray([1, 2, 3]));
            assert.isTrue(CommonHelper.isArray([{"test": 1}]));
        });

        it('should results to false', () => {
            assert.isFalse(CommonHelper.isArray());
            assert.isFalse(CommonHelper.isArray('test'));
            assert.isFalse(CommonHelper.isArray(null));
            assert.isFalse(CommonHelper.isArray(123));
            assert.isFalse(CommonHelper.isArray({"test": 1}));
            assert.isFalse(CommonHelper.isArray(function(){}));
        });
    });

    describe('isFunction()', () => {
        it('should results to true', () => {
            assert.isTrue(CommonHelper.isFunction(function() {}));
        });

        it('should results to false', () => {
            assert.isFalse(CommonHelper.isFunction());
            assert.isFalse(CommonHelper.isFunction('test'));
            assert.isFalse(CommonHelper.isFunction(null));
            assert.isFalse(CommonHelper.isFunction(123));
            assert.isFalse(CommonHelper.isFunction([1, 2, 3]));
            assert.isFalse(CommonHelper.isFunction({"test": 1}));
        });
    });

    describe('isBoolean()', () => {
        it('should results to true', () => {
            assert.isTrue(CommonHelper.isBoolean(true));
            assert.isTrue(CommonHelper.isBoolean(false));
        });

        it('should results to false', () => {
            assert.isFalse(CommonHelper.isBoolean());
            assert.isFalse(CommonHelper.isBoolean('test'));
            assert.isFalse(CommonHelper.isBoolean(null));
            assert.isFalse(CommonHelper.isBoolean(1));
            assert.isFalse(CommonHelper.isBoolean([1, 2, 3]));
            assert.isFalse(CommonHelper.isBoolean({"test": 1}));
            assert.isFalse(CommonHelper.isBoolean(function(){}));
        });
    });

    describe('isString()', () => {
        it('should results to true', () => {
            assert.isTrue(CommonHelper.isString(''));
            assert.isTrue(CommonHelper.isString('test'));
        });

        it('should results to false', () => {
            assert.isFalse(CommonHelper.isString());
            assert.isFalse(CommonHelper.isString(null));
            assert.isFalse(CommonHelper.isString(1));
            assert.isFalse(CommonHelper.isString([1, 2, 3]));
            assert.isFalse(CommonHelper.isString({"test": 1}));
            assert.isFalse(CommonHelper.isString(function(){}));
        });
    });

    describe('isEmpty()', () => {
        it('should results to true', () => {
            assert.isTrue(CommonHelper.isEmpty());
            assert.isTrue(CommonHelper.isEmpty(null));
            assert.isTrue(CommonHelper.isEmpty(''));
            assert.isTrue(CommonHelper.isEmpty([]));
            assert.isTrue(CommonHelper.isEmpty({}));
        });

        it('should results to false', () => {
            assert.isFalse(CommonHelper.isEmpty(' '));
            assert.isFalse(CommonHelper.isEmpty(0));
            assert.isFalse(CommonHelper.isEmpty(function(){}));
            assert.isFalse(CommonHelper.isEmpty([1, 2, 3]));
            assert.isFalse(CommonHelper.isEmpty({"test": 1}));
        });
    });

    describe('randomString()', () => {
        it('should generate random strings with the correct length', () => {
            assert.lengthOf(CommonHelper.randomString(), 10);
            assert.lengthOf(CommonHelper.randomString(4), 4);
        });
    });

    describe('slugify()', () => {
        it('should generate valid slug strings', () => {
            assert.equal(CommonHelper.slugify(''), '');
            assert.equal(CommonHelper.slugify('test'), 'test');
            assert.equal(CommonHelper.slugify('lorem ipsum.test1=test2-test3'), 'lorem_ipsum_test1_test2_test3');
            assert.equal(CommonHelper.slugify('lorem.ipsum!+><?,[]}{|`'), 'lorem_ipsum');
            assert.equal(CommonHelper.slugify('lorem.ipsum123'), 'lorem_ipsum123');
            assert.equal(CommonHelper.slugify('lorem!ipsum', 'DELIM', ['!']), 'loremDELIMipsum');
        });
    });

    describe('getNestedVal()', () => {
        it('should safely return nested object value', () => {
            var obj = {
                'a': {'b': {'c': 1}},
                'd': 'test'
            };

            assert.equal(CommonHelper.getNestedVal(obj, 'a.b.c'), 1);
            assert.equal(CommonHelper.getNestedVal(obj, 'a_b_c', null, '_'), 1);
            assert.equal(CommonHelper.getNestedVal(obj, 'd'), 'test');
            assert.equal(CommonHelper.getNestedVal(obj, 'd.e'), null);
            assert.equal(CommonHelper.getNestedVal(obj, 'd.e', 'missing'), 'missing');
        });

        it('should safely return nested array value', () => {
            var arr = [
                [[1], 2],
                'test'
            ];

            assert.equal(CommonHelper.getNestedVal(arr, '0.0.0'), 1);
            assert.equal(CommonHelper.getNestedVal(arr, '0_1', null, '_'), 2);
            assert.equal(CommonHelper.getNestedVal(arr, '1'), 'test');
            assert.equal(CommonHelper.getNestedVal(arr, '0.3'), null);
            assert.equal(CommonHelper.getNestedVal(arr, '0.3', 'missing'), 'missing');
        });
    });

    describe('inArray()', () => {
        it('should results to true', () => {
            assert.isTrue(CommonHelper.inArray([0, 1, 2, 3], '1'));
            assert.isTrue(CommonHelper.inArray([0, 1, 2, 3], 2));
            assert.isTrue(CommonHelper.inArray(['test1', 'test2'], 'test1'));
            assert.isTrue(CommonHelper.inArray([0, 1, 2, 3], false), 'loosely check');
            assert.isTrue(CommonHelper.inArray([''], false), 'loosely check');
            assert.isTrue(CommonHelper.inArray([''], 0), 'loosely check');
        });

        it('should results to false', () => {
            assert.isFalse(CommonHelper.inArray([], ''));
            assert.isFalse(CommonHelper.inArray([], false));
            assert.isFalse(CommonHelper.inArray([], 'test'));
            assert.isFalse(CommonHelper.inArray([], 0));
            assert.isFalse(CommonHelper.inArray([1, 2, 3], 4));
            assert.isFalse(CommonHelper.inArray([1, 2, 3], 'test'));
        });
    });

    describe('findArrayObject()', () => {
        it('should returns the correct array object', () => {
            var arr = [{id: 1}, {id: 2}];

            assert.equal(CommonHelper.findArrayObject(arr, 'test', 1), null);
            assert.equal(CommonHelper.findArrayObject(arr, 'id', 3), null);
            assert.deepEqual(CommonHelper.findArrayObject(arr, 'id', 1), {id: 1});
        });
    });

    describe('deleteArrayObject()', () => {
        it('should delete the specified array object', () => {
            var arr = [{id: 1}, {id: 2}];

            assert.deepEqual(CommonHelper.deleteArrayObject(arr, 'test', 1), [{id: 1}, {id: 2}]);
            assert.deepEqual(CommonHelper.deleteArrayObject(arr, 'id', 3), [{id: 1}, {id: 2}]);
            assert.deepEqual(CommonHelper.deleteArrayObject(arr, 'id', 1), [{id: 2}]);
        });
    });

    describe('humanize()', () => {
        it('should successfully "humanize" a string', () => {
            assert.equal(CommonHelper.humanize(''), '');
            assert.equal(CommonHelper.humanize('lorem_ipsum dolor sit_amet'), 'Lorem ipsum dolor sit amet');
            assert.equal(CommonHelper.humanize('lorem_ipsum dolor sit_amet', '.'), 'Lorem_ipsum dolor sit_amet');
            assert.equal(CommonHelper.humanize('lorem.ipsum dolor sit.amet', '.'), 'Lorem ipsum dolor sit amet');
        });
    });
});
