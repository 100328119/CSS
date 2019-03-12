import React from 'react';
import {authRoles} from 'app/auth';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const DashboardAppConfig = {
    settings: {
        layout: {}
    },
    auth  : authRoles.user,
    routes  : [
        {
            path     : '/dashboard/boards',
            component: FuseLoadable({
                loader: () => import('./boards/Boards')
            })
        },
        {
            path     : '/dashboard',
            component: () => <Redirect to="/dashboard/boards"/>
        }
    ]
};
