import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const BuildingConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/building',
            component: FuseLoadable({
                loader: () => import('./Building')
            })
        }
    ]
};
