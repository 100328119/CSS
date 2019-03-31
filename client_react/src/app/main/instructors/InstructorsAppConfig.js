import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseLoadable} from '@fuse';

export const InstructorsAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/instructors/:id',
            component: FuseLoadable({
                loader: () => import('./InstructorsApp')
            })
        },
        {
            path     : '/instructor/:id',
            component: FuseLoadable({
                loader: () => import('./instructor/instructor')
            })
        },
        {
            path     : '/instructors',
            component: () => <Redirect to="/instructors/all"/>
        }
    ]
};
