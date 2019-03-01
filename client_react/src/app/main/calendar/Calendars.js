import React from 'react';
import {FusePageCarded} from '@fuse';
import withReducer from 'app/store/withReducer';

import CalendarsTable from './CalendarsTable';
import CalendarsHeader from './CalendarsHeader';
import reducer from '../store/reducers';

const Calendars = () => {
  return (
    <FusePageCarded
        classes={{
            content: "flex",
            header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
        }}
        header={
            <CalendarsHeader/>
        }
        content={
            <CalendarsTable/>
        }
        innerScroll
      />
  )
}

export default withReducer('CalendarsApp', reducer)(Calendars);
