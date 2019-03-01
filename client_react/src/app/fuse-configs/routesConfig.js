import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseUtils} from '@fuse/index';
import {ExampleConfig} from 'app/main/example/ExampleConfig';
import {CalendarAppConfig} from 'app/main/calendar/CalendarAppConfig';
import {LoginConfig} from 'app/main/login/LoginConfig';
import {LogoutConfig} from 'app/main/logout/LogoutConfig';
import {ECommerceAppConfig} from 'app/main/e-commerce/ECommerceAppConfig';
import {AdminConfig} from 'app/main/adminstration/AdminConfig';
import {CampusConfig} from 'app/main/campus/CampusConfig';
import {BuildingConfig} from 'app/main/building/BuildingConfig';
import {RoomConfig} from 'app/main/room/RoomConfig';
import {InstructorsAppConfig} from "app/main/instructors/InstructorsAppConfig";
import {SemesterConfig} from "app/main/semester/SemesterConfig";
import {CoursesPageConfig} from "app/main/course/CoursesPageConfig";
import {DepartmentsAppConfig} from "app/main/departments/DepartmentsAppConfig";


const routeConfigs = [
    ExampleConfig,
    CalendarAppConfig,
    LoginConfig,
    LogoutConfig,
    ECommerceAppConfig,
    AdminConfig,
    CampusConfig,
    BuildingConfig,
    RoomConfig,
    InstructorsAppConfig,
    SemesterConfig,
    CoursesPageConfig,
    DepartmentsAppConfig
];

 const routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
    {
        path     : '/',
        component: () => <Redirect to="/example"/>
    }
];

 export default routes;
