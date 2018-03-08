import Vue               from 'vue'
import Router            from 'vue-router'
import CommonHelper      from '@/utils/CommonHelper'
import AuthHelper        from '@/utils/AuthHelper'
import AccessForbidden   from '@/views/error/AccessForbidden'
import Login             from '@/views/auth/Login'
import ForgottenPassword from '@/views/auth/ForgottenPassword'
import ResetPassword     from '@/views/auth/ResetPassword'
import MediaIndex        from '@/views/media/Index'
import MediaView         from '@/views/media/View'
import CollectionIndex   from '@/views/collection/Index'
import CollectionCreate  from '@/views/collection/Create'
import CollectionUpdate  from '@/views/collection/Update'
import EntityIndex       from '@/views/entity/Index'
import EntityCreate      from '@/views/entity/Create'
import EntityUpdate      from '@/views/entity/Update'
import LanguageIndex     from '@/views/language/Index'
import LanguageCreate    from '@/views/language/Create'
import LanguageUpdate    from '@/views/language/Update'
import KeyIndex          from '@/views/key/Index'
import KeyCreate         from '@/views/key/Create'
import KeyUpdate         from '@/views/key/Update'
import UserIndex         from '@/views/user/Index'
import UserCreate        from '@/views/user/Create'
import UserUpdate        from '@/views/user/Update'

Vue.use(Router);

const router = new Router({
    mode: "history",
    routes: [
        // Auth
        {
            path:      '/login',
            name:      'login',
            component: Login
        },
        {
            path:      '/forgotten-password',
            name:      'forgotten-password',
            component: ForgottenPassword
        },
        {
            path:      '/reset-password',
            name:      'reset-password',
            component: ResetPassword
        },

        // Collections
        {
            path:      '/collections',
            name:      'collection-index',
            component: CollectionIndex,
            meta:      {'group': 'collection', 'action': 'index'}
        },
        {
            path:      '/collections/create',
            name:      'collection-create',
            component: CollectionCreate,
            meta:      {'group': 'collection', 'action': 'create'}
        },
        {
            path:      '/collections/:cid/update',
            name:      'collection-update',
            component: CollectionUpdate,
            meta:      {'group': 'collection', 'action': 'update'}
        },

        // Entities
        {
            path:      '/collections/:cid',
            name:      'entity-index',
            component: EntityIndex
        },
        {
            path:      '/collections/:cid/create',
            name:      'entity-create',
            component: EntityCreate
        },
        {
            path:      '/collections/:cid/:id',
            name:      'entity-update',
            component: EntityUpdate
        },

        // Media
        {
            path:      '/media',
            name:      'media-index',
            component: MediaIndex,
            meta:      {'group': 'media', 'action': 'index'}
        },
        {
            path:      '/media/:id',
            name:      'media-view',
            component: MediaView,
            meta:      {'group': 'media', 'action': 'view'}
        },

        // Language
        {
            path:      '/settings/languages',
            name:      'language-index',
            component: LanguageIndex,
            meta:      {}
        },
        {
            path:      '/settings/languages/create',
            name:      'language-create',
            component: LanguageCreate,
            meta:      {'group': 'language', 'action': 'create'}
        },
        {
            path:      '/settings/languages/:id',
            name:      'language-update',
            component: LanguageUpdate,
            meta:      {'group': 'language', 'action': 'update'}
        },

        // Keys
        {
            path:      '/settings/keys',
            name:      'key-index',
            component: KeyIndex,
            meta:      {'group': 'key', 'action': 'index'}
        },
        {
            path:      '/settings/keys/create',
            name:      'key-create',
            component: KeyCreate,
            meta:      {'group': 'key', 'action': 'create'}
        },
        {
            path:      '/settings/keys/:id',
            name:      'key-update',
            component: KeyUpdate,
            meta:      {'group': 'key', 'action': 'update'}
        },

        // Users
        {
            path:      '/settings/users',
            name:      'user-index',
            component: UserIndex,
            meta:      {'group': 'user', 'action': 'index'}
        },
        {
            path:      '/settings/users/create',
            name:      'user-create',
            component: UserCreate,
            meta:      {'group': 'user', 'action': 'create'}
        },
        {
            path:      '/settings/users/:id',
            name:      'user-update',
            component: UserUpdate,
            meta:      {'group': 'user', 'action': 'update'}
        },

        // Errors
        {
            path:        '/access-forbidden',
            name:        'access-forbidden',
            component:   AccessForbidden,
            props:       {error: false},
            beforeEnter: (to, from, next) => {
                // allow access only if `error` parameter is set
                if (to.params && to.params.error) {
                    return next();
                }

                return next({name: APP_CONFIG.homepageRoute});
            }
        },

        // "catch all" redirect
        {
            path:     '*',
            redirect: '/collections'
        }
    ]
});

const publicRoutes = ['login', 'forgotten-password', 'reset-password'];

router.beforeEach((to, from, next) => {
    var token         = AuthHelper.getData('token');
    var isPublicRoute = CommonHelper.inArray(publicRoutes, to.name);

    // missing/expired token
    if (!isPublicRoute && !token) {
        return next({name: 'login'});
    }

    // trying to access public route with valid token
    if (isPublicRoute && token) {
        return next({name: APP_CONFIG.homepageRoute});
    }

    if (to.meta && to.meta.group && to.meta.action) {
        if (!AuthHelper.canAccess(to.meta.group, to.meta.action)) {
            return next({name: 'access-forbidden', params: {error: true}});
        }
    }

    return next();
});

export default router;
