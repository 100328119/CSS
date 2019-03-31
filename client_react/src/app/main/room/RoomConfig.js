import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const RoomConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/room',
            component: FuseLoadable({
                loader: () => import('./Room')
            })
        }
    ]
};
