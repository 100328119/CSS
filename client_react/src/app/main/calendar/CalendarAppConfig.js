import {authRoles} from 'app/auth';
import {FuseLoadable} from '@fuse';

export const CalendarAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    auth    : authRoles.user,
    routes  : [
        {
            path     : '/calendar',
            component: FuseLoadable({
                loader: () => import('./CalendarApp')
            })
        },
        {
            path     : '/new/calendar',
            component: FuseLoadable({
                loader: () => import('./NewCalendar')
            })
        }
    ]
};
