import SettingsStorage from '@/utils/SettingsStorage';

describe('SettingsStorage', () => {
    beforeEach(function() {
        localStorage.clear();
        sessionStorage.clear();
    });

    describe('getStorage()', () => {
        it('should return Storage instance', () => {
            assert.instanceOf(SettingsStorage.getStorage(), window.Storage);
        });
    });

    describe('hasStorage()', () => {
        it('should check whether a Storage instance is defined', () => {
            assert.isTrue(SettingsStorage.hasStorage());
        });
    });

    describe('setItem/getItem()', () => {
        it('should successfully store and retrieve user specified data', () => {
            SettingsStorage.setItem('test1', 1);
            assert.equal(SettingsStorage.getItem('test1'), 1);

            SettingsStorage.setItem('test2', true);
            assert.equal(SettingsStorage.getItem('test2'), true);

            SettingsStorage.setItem('test3', 'test');
            assert.equal(SettingsStorage.getItem('test3'), 'test');

            SettingsStorage.setItem('test4', [1, 2, 3]);
            assert.deepEqual(SettingsStorage.getItem('test4'), [1, 2, 3]);

            SettingsStorage.setItem('test5', {'a': 1});
            SettingsStorage.setItem('test5', {'a': 1});
            assert.deepEqual(SettingsStorage.getItem('test5'), {'a': 1});

            assert.equal(SettingsStorage.getItem('test6', 'missing'), 'missing');
        });
    });

    describe('removeItem()', () => {
        it('should successfully remove stored item', () => {
            SettingsStorage.setItem('test', 1);
            SettingsStorage.removeItem('test');
            assert.equal(SettingsStorage.getItem('test'), null);
        });
    });
});
