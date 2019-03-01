import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseLoadable} from '@fuse';

export const DepartmentsAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/departments/:id',
            component: FuseLoadable({
                loader: () => import('./DepartmentsApp')
            })
        },
        {
            path     : '/departments',
            component: () => <Redirect to="/departments/all"/>
        }
    ]
};
