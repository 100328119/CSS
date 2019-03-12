import {authRoles} from 'app/auth';
import {FuseLoadable} from '@fuse';

export const CalendarsAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    auth    : authRoles.user,
    routes  : [
        {
            path     : '/calendars/:id',
            component: FuseLoadable({
                loader: () => import('./CalendarDetail')
            })
        }
    ]
};
