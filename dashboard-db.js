import mock from './../mock';
import _ from '@lodash';
import {amber, blue, blueGrey, green} from '@material-ui/core/colors';

const dashboardDB = {
    departments: [
        {
            '_id'   : 0,
            'value': 'it',
            'label': 'IT',
            'color': blue[500]
        },
        {
            '_id'   : 1,
            'value': 'arts',
            'label': 'Arts',
            'color': amber[500]
        },
        {
            '_id'   : 2,
            'value': 'marketing',
            'label': 'Marketing',
            'color': blueGrey[500]
        },
        {
            '_id'   : 3,
            'value': 'science',
            'label': 'Science',
            'color': green[500]
        }
    ],
    boards   : [
        {
            '_id'         : '15459251a6d6b397565',
            'name'      : 'Fall Semester 2019',
            'uri'       : 'fall-semester-2019',
            'department'   : 'it',
        },
        {
            '_id'         : '154588a0864d2881124',
            'name'      : 'Fall Semester 2019',
            'uri'       : 'fall-semester-2019',
            'department'   : 'science',
        },
        {
            '_id'         : '15453ba60d3baa5daaf',
            'name'      : 'Spring Semester 2019',
            'uri'       : 'spring-semester-2019',
            'department'   : 'marketing',

        },
        {
            '_id'         : '15453a06c08fb021776',
            'name'      : 'Summer Semester 2019',
            'uri'       : 'summer-semester-2019',
            'department'   : 'marketing',

        },
        {
            '_id'         : '15427f4c1b7f3953234',
            'name'      : 'Fall Semester 2019',
            'uri'       : 'fall-semester-2019',
            'department'   : 'arts',

        },
        {
            '_id'         : '15427f4c1b7f3953235',
            'name'      : 'Spring Semester 2019',
            'uri'       : 'spring-semester-2019',
            'department'   : 'it',

        },
        {
            '_id'         : '15427f4c1b7f3953236',
            'name'      : 'Spring Semester 2019',
            'uri'       : 'spring-semester-2019',
            'department'   : 'science',

        },
        {
            '_id'         : '15427f4c1b7f3953237',
            'name'      : 'Summer Semester 2019',
            'uri'       : 'summer-semester-2019',
            'department'   : 'arts',

        },
    ]
};

mock.onGet('/api/dashboard-app/departments').reply(() => {
    return [200, dashboardDB.departments];
});

mock.onGet('/api/dashboard-app/boards').reply(() => {
    return [200, dashboardDB.boards.map((_board) => _.omit(_board, ['steps']))];
});

mock.onGet('/api/dashboard-app/board').reply((request) => {
    const {boardId} = request.params;
    const response = _.find(dashboardDB.boards, {id: boardId});
    return [200, response];
});

mock.onPost('/api/dashboard-app/board/save').reply((request) => {
    const data = JSON.parse(request.data);
    let board = null;

    dashboardDB.boards = dashboardDB.boards.map(_board => {
        if ( _board.id === data.id )
        {
            board = data;
            return board
        }
        return _board;
    });

    if ( !board )
    {
        board = data;
        dashboardDB.boards = [
            ...dashboardDB.boards,
            board
        ]
    }

    return [200, board];
});

mock.onPost('/api/dashboard-app/board/update').reply((request) => {
    const data = JSON.parse(request.data);
    dashboardDB.boards = dashboardDB.boards.map(_board => {
        if ( _board.id === data.id )
        {
            return _.merge(_board, data);
        }
        return _board;
    });

    return [200, data];
});
