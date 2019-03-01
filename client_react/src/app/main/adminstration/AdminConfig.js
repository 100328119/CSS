import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const AdminConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/admin/users',
            component: FuseLoadable({
                loader: () => import('./users/Users')
            })
        },
        {
            path     : '/admin/user/:userId',
            component: FuseLoadable({
                loader: () => import('./user/User')
            })
        }
    ]
};
