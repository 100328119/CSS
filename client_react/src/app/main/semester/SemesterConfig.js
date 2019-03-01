import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseLoadable} from '@fuse';

export const SemesterConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/semesters',
            component: FuseLoadable({
                loader: () => import('./Semester')
            })
        },
    ]
};
