const { RoleConstants } = require('../constants');
const { ADMIN, MANAGER, USER } = RoleConstants;

const menu = [
    {
        name: 'Partner',
        roles: [MANAGER, ADMIN],
        icon: 'gi gi-vcard',
        url: '/partners',
        sub: [
            {
                name: 'Add new',
                url: '/partners/create',
            },
            {
                name: 'List',
                url: '/partners',
            },
        ],
    },
    {
        name: 'Partner Account',
        roles: [MANAGER, ADMIN],
        icon: 'gi gi-old_man',
        url: '/partner_accounts',
        sub: [
            {
                name: 'Add new',
                url: '/partner_accounts/create',
            },
            {
                name: 'List',
                url: '/partner_accounts',
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
                name: 'Add new',
                url: '/products/create',
            },
            {
                name: 'List',
                url: '/products',
            },
        ],
    },
    {
        name: 'Product Mapping',
        roles: [MANAGER, ADMIN],
        icon: 'gi gi-more_items',
        url: '/product_mappings',
        sub: [
            {
                name: 'Add new',
                url: '/product_mappings/create',
            },
            {
                name: 'List',
                url: '/product_mappings',
            },
        ],
    },
    {
        name: 'User Management',
        roles: [MANAGER, ADMIN],
        icon: 'gi gi-user_add',
        url: '/accounts/managers',
        sub: [
            {
                name: 'Add new',
                url: '/accounts/managers/create',
            },
            {
                name: 'List',
                url: '/accounts/managers',
            },
        ],
    },
    {
        name: 'Export logs',
        roles: [MANAGER, ADMIN, USER],
        icon: 'gi gi-package',
        url: '/exports',
    },
];

module.exports = menu;
