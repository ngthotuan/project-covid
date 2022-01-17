const { RoleConstants } = require('../constants');
const { ADMIN, MANAGER, USER } = RoleConstants;

const menu = [
    {
        name: 'Dashboard',
        roles: [MANAGER],
        icon: 'gi gi-stopwatch',
        url: '/',
    },
    {
        name: 'Bệnh Nhân',
        roles: [MANAGER],
        icon: 'gi gi-user',
        url: '/patients',
        sub: [
            {
                name: 'Tạo mới',
                url: '/patients/create',
            },
            {
                name: 'Xem danh sách',
                url: '/patients',
            },
        ],
    },
    {
        name: 'Sản phẩm',
        roles: [MANAGER],
        icon: 'gi gi-cake',
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
        name: 'Gói nhu yếu phẩm',
        roles: [MANAGER],
        icon: 'gi gi-shopping_cart',
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
        name: 'Khu điều trị, cách ly',
        roles: [ADMIN],
        icon: 'gi gi-bank',
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
        name: 'Người quản lý',
        roles: [ADMIN],
        icon: 'gi gi-user_add',
        url: '/managers',
        sub: [
            {
                name: 'Tạo mới',
                url: '/managers/create',
            },
            {
                name: 'Xem danh sách',
                url: '/managers',
            },
        ],
    },
    {
        name: 'Quản lý thanh toán',
        roles: [MANAGER],
        icon: 'gi gi-sampler',
        url: '/payments',
        sub: [
            {
                name: 'Thay đổi hạn mức',
                url: '/payments/change-limit',
            },
            {
                name: 'Duyệt danh sách',
                url: '/payments',
            },
        ],
    },
    {
        name: 'Thông tin cá nhân',
        roles: [USER],
        icon: 'gi gi-old_man',
        url: '/users',
        sub: [
            {
                name: 'Các thông tin cơ bản',
                url: '/users/details',
            },
            {
                name: 'Lịch sử được quản lý',
                url: '/users/manager-history',
            },
            {
                name: 'Lịch sử tiêu thụ',
                url: '/users/category-history',
            },
            {
                name: 'Dư nợ & Lịch sử thanh toán',
                url: '/users/payment-history',
            },
        ],
    },
    {
        name: 'Nhu yếu phẩm',
        roles: [USER],
        icon: 'gi gi-package',
        url: '/users/categories',
    },
];

module.exports = menu;
