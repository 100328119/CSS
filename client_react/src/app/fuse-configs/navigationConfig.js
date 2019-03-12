import {authRoles} from 'app/auth';
const navigationConfig = [
    {
        'id'      : 'applications',
        'title'   : 'Applications',
        'type'    : 'group',
        'icon'    : 'apps',
        'children': [
            {
                'id'   : 'dashboard-component',
                'title': 'dashboard',
                'type' : 'item',
                'icon' : 'today',
                 auth  : authRoles.user,
                'url'  : '/dashboard/boards'
            },
            {
                'id'   : 'Administration-component',
                'title': 'Administration',
                'type' : 'item',
                'icon' : 'today',
                'auth' : authRoles.admin,
                'url'  : '/admin/users'
            },
            {
                'id'   : 'Campus-component',
                'title': 'Campus',
                'type' : 'item',
                'icon' : 'today',
                'auth' : authRoles.admin,
                'url'  : '/campus'
            },
            {
                'id'   : 'Building-component',
                'title': 'Building',
                'type' : 'item',
                'icon' : 'today',
                'auth' : authRoles.admin,
                'url'  : '/building'
            },
            {
                'id'   : 'Room-component',
                'title': 'Room',
                'type' : 'item',
                'icon' : 'today',
                'auth' : authRoles.admin,
                'url'  : '/room'
            },
            {
                'id'   : 'Semester-component',
                'title': 'Semester',
                'type' : 'item',
                'icon' : 'today',
                'auth' : authRoles.admin,
                'url'  : '/semesters'
            },
            {
              'id'   : 'instructor-component',
              'title': 'instructor',
              'type' : 'item',
              'icon' : 'today',
              'auth' : authRoles.admin,
              'url'  : '/instructors'
            },
            {
              'id'   : 'department-component',
              'title': 'department',
              'type' : 'item',
              'icon' : 'today',
              'auth' : authRoles.admin,
              'url'  : '/departments'
            },
            {
              'id'   : 'course-component',
              'title': 'course',
              'type' : 'item',
              'icon' : 'today',
              'auth' : authRoles.admin,
              'url'  : '/courses'
            },
            {
              'id'   : 'calendar-component',
              'title': 'calendar',
              'type' : 'item',
              'icon' : 'today',
              'url'  : '/calendar'
            },
            {
              'id'   : 'NewCalendar-component',
              'title': 'Create Calendar',
              'type' : 'item',
              'icon' : 'today',
              'url'  : '/new/calendar'
            },
            {
              'id'   : 'NewCalendars-component',
              'title': 'Create Calendar Production',
              'type' : 'item',
              'icon' : 'today',
              'url'  : '/calendars/new'
            },
            {
              'id'   : 'login-component',
              'title': 'login',
              'type' : 'item',
              'icon' : 'today',
               auth  : authRoles.onlyGuest,
              'url'  : '/login'
            },
            {
                'id'   : 'logout',
                'title': 'Logout',
                'type' : 'item',
                auth   : authRoles.user,
                'url'  : '/logout',
                'icon' : 'exit_to_app'
            },
            {
                'id'   : 'example-component',
                'title': 'example',
                'type' : 'item',
                'icon' : 'today',
                'url'  : '/example'
            },
            {
                'id'      : 'e-commerce',
                'title'   : 'E-Commerce',
                'type'    : 'collapse',
                'icon'    : 'shopping_cart',
                'url'     : '/apps/e-commerce',
                'children': [
                    {
                        'id'   : 'e-commerce-products',
                        'title': 'Products',
                        'type' : 'item',
                        'url'  : '/apps/e-commerce/products',
                        'exact': true
                    },
                    {
                        'id'   : 'e-commerce-product-detail',
                        'title': 'Product Detail',
                        'type' : 'item',
                        'url'  : '/apps/e-commerce/products/1/a-walk-amongst-friends-canvas-print',
                        'exact': true
                    },
                    {
                        'id'   : 'e-commerce-new-product',
                        'title': 'New Product',
                        'type' : 'item',
                        'url'  : '/apps/e-commerce/products/new',
                        'exact': true
                    },
                    {
                        'id'   : 'e-commerce-orders',
                        'title': 'Orders',
                        'type' : 'item',
                        'url'  : '/apps/e-commerce/orders',
                        'exact': true
                    },
                    {
                        'id'   : 'e-commerce-order-detail',
                        'title': 'Order Detail',
                        'type' : 'item',
                        'url'  : '/apps/e-commerce/orders/1',
                        'exact': true
                    }
                ]
            },

        ]
    }
];

export default navigationConfig;
