const { RoleConstants } = require('../constants');
const { ADMIN, MANAGER, USER } = RoleConstants;

const menu = [
    {
        name: 'Đối tác',
        roles: [MANAGER, ADMIN],
        icon: 'gi gi-vcard',
        url: '/partners',
        sub: [
            {
                name: 'Tạo mới',
                url: '/partners/create',
            },
            {
                name: 'Xem danh sách',
                url: '/partners',
            },
        ],
    },
    {
        name: 'Tài khoản đối tác',
        roles: [MANAGER, ADMIN],
        icon: 'gi gi-old_man',
        url: '/categories',
        sub: [
            {
                name: 'Tạo mới',
                url: '/categories/create',
            },
            {
                name: 'Xem danh sách',
                url: '/categories',
            },
        ],
    },
    {
        name: 'Product',
        roles: [MANAGER, ADMIN],
        icon: 'gi gi-suitcase',
        url: '/products',
        sub: [
            {
                name: 'Tạo mới',
                url: '/products/create',
            },
            {
                name: 'Xem danh sách',
                url: '/products',
            },
        ],
    },
    {
        name: 'Product mapping',
        roles: [MANAGER, ADMIN],
        icon: 'gi gi-more_items',
        url: '/hospitals',
        sub: [
            {
                name: 'Tạo mới',
                url: '/hospitals/create',
            },
            {
                name: 'Xem danh sách',
                url: '/hospitals',
            },
        ],
    },
    {
        name: 'Quản lý người dùng',
        roles: [MANAGER, ADMIN],
        icon: 'gi gi-user_add',
        url: '/accounts/managers',
        sub: [
            {
                name: 'Tạo mới',
                url: '/accounts/managers/create',
            },
            {
                name: 'Xem danh sách',
                url: '/accounts/managers',
            },
        ],
    },
    {
        name: 'Export logs',
        roles: [MANAGER, ADMIN],
        icon: 'gi gi-package',
        url: '/users/categories',
    },
];

module.exports = menu;
