import {FuseLoadable} from '@fuse';

export const CoursesPageConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/courses',
            component: FuseLoadable({
                loader: () => import('./CoursesPage')
            })
        }
    ]
};
