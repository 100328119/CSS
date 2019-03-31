import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const CampusConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/campus',
            component: FuseLoadable({
                loader: () => import('./Campus')
            })
        }
    ]
};
