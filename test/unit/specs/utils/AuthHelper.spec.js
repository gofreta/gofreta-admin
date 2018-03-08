import AuthHelper from '@/utils/AuthHelper';
import Cookies    from '@/utils/Cookies';

describe('AuthHelper', () => {
    beforeEach(function() {
        Cookies.removeItem(APP_CONFIG.authCookieKey, '/');
    });

    describe('setData()/getData()', () => {
        it('should successfully set and retrieve auth data', () => {
            var exp = new Date(2030, 1, 1);
            AuthHelper.setData('test_token', {'test': 1}, exp);

            // without specify key
            var data = AuthHelper.getData();
            assert.deepEqual(data, {'token': 'test_token', 'user': {'test': 1}, 'exp': exp.toJSON()});

            // specify key
            assert.isNull(AuthHelper.getData('missing'));
            assert.equal(AuthHelper.getData('token'), 'test_token');
            assert.deepEqual(AuthHelper.getData('user'), {'test': 1});
            assert.equal(AuthHelper.getData('exp'), exp.toJSON());
        });

        it('should successfully set but fail retrieve auth data', () => {
            var exp = new Date(2010, 1, 1);
            AuthHelper.setData('test_token', {'test': 1}, exp);

            // without specify key
            assert.isEmpty(AuthHelper.getData());

            // specify key
            assert.isNull(AuthHelper.getData('missing'));
            assert.isNull(AuthHelper.getData('token'));
            assert.isNull(AuthHelper.getData('user'));
            assert.isNull(AuthHelper.getData('exp'));
        });
    });

    describe('resetData()', () => {
        it('should successfully reset all auth data', () => {
            AuthHelper.setData('test_token', {'test': 1}, new Date(2030, 1, 1));

            AuthHelper.resetData();

            assert.isEmpty(AuthHelper.getData());
        });
    });

    describe('isGuest()', () => {
        it('should return true', () => {
            assert.isTrue(AuthHelper.isGuest());
        });

        it('should return false', () => {
            AuthHelper.setData('test_token', {'test': 1}, new Date(2030, 1, 1));
            assert.isFalse(AuthHelper.isGuest());
        });
    });

    describe('canAccess()', () => {
        var userData = {"access": {"group1": ["index", "view"], "group2": []}};

        it('should results to false since no auth data is missing', () => {
            assert.isFalse(AuthHelper.canAccess("group1", "index"));
        });

        it('should results to true', () => {
            AuthHelper.setData('test', userData, new Date(2030, 1, 1));
            assert.isTrue(AuthHelper.canAccess("group1", "index"));
            assert.isTrue(AuthHelper.canAccess("group1", "view"));
        });

        it('should results to false', () => {
            AuthHelper.setData('test', userData, new Date(2030, 1, 1));
            assert.isFalse(AuthHelper.canAccess("group1", ""));
            assert.isFalse(AuthHelper.canAccess("group2", ""));
            assert.isFalse(AuthHelper.canAccess("group1", "delete"));
            assert.isFalse(AuthHelper.canAccess("group2", "index"));
        });
    });
});
