import React, { Component } from "react";
import { withStyles, Fab, Icon } from "@material-ui/core";
import { FuseAnimate } from "@fuse";
import BigCalendar from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import moment from "moment";
import classNames from "classnames";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import withReducer from "app/store/withReducer";
import * as Actions from "./store/actions";
import reducer from "./store/reducers";
import EventDialog from "./EventDialog";
import CalendarHeader from "./CalendarHeader";
import { RRule, RRuleSet, rrulestr } from "rrule";
import _ from "@lodash";

const localizer = BigCalendar.momentLocalizer(moment);

const DragAndDropCalendar = withDragAndDrop(BigCalendar);

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

const styles = theme => ({
  root: {
    "& .rbc-header": {
      padding: "12px 6px",
      fontWeight: 600,
      fontSize: 14
    },
    "& .rbc-label": {
      padding: "8px 6px"
    },
    "& .rbc-today": {
      backgroundColor: "transparent"
    },
    "& .rbc-header.rbc-today, & .rbc-month-view .rbc-day-bg.rbc-today": {
      borderBottom: "2px solid " + theme.palette.secondary.main + "!important"
    },
    "& .rbc-month-view, & .rbc-time-view, & .rbc-agenda-view": {
      padding: 24,
      [theme.breakpoints.down("sm")]: {
        padding: 16
      },
      ...theme.mixins.border(0)
    },
    "& .rbc-agenda-view table": {
      ...theme.mixins.border(1),
      "& thead > tr > th": {
        ...theme.mixins.borderBottom(0)
      },
      "& tbody > tr > td": {
        padding: "12px 6px",
        "& + td": {
          ...theme.mixins.borderLeft(1)
        }
      }
    },
    "& .rbc-time-view": {
      "& .rbc-time-header": {
        ...theme.mixins.border(1)
      },
      "& .rbc-time-content": {
        flex: "0 1 auto",
        ...theme.mixins.border(1)
      }
    },
    "& .rbc-month-view": {
      "& > .rbc-row": {
        ...theme.mixins.border(1)
      },
      "& .rbc-month-row": {
        ...theme.mixins.border(1),
        borderWidth: "0 1px 1px 1px!important",
        minHeight: 128
      },
      "& .rbc-header + .rbc-header": {
        ...theme.mixins.borderLeft(1)
      },
      "& .rbc-header": {
        ...theme.mixins.borderBottom(0)
      },
      "& .rbc-day-bg + .rbc-day-bg": {
        ...theme.mixins.borderLeft(1)
      }
    },
    "& .rbc-day-slot .rbc-time-slot": {
      ...theme.mixins.borderTop(1),
      opacity: 0.5
    },
    "& .rbc-time-header > .rbc-row > * + *": {
      ...theme.mixins.borderLeft(1)
    },
    "& .rbc-time-content > * + * > *": {
      ...theme.mixins.borderLeft(1)
    },
    "& .rbc-day-bg + .rbc-day-bg": {
      ...theme.mixins.borderLeft(1)
    },
    "& .rbc-time-header > .rbc-row:first-child": {
      ...theme.mixins.borderBottom(1)
    },
    "& .rbc-timeslot-group": {
      minHeight: 64,
      ...theme.mixins.borderBottom(1)
    },
    "& .rbc-date-cell": {
      padding: 8,
      fontSize: 16,
      fontWeight: 400,
      opacity: 0.5,
      "& > a": {
        color: "inherit"
      }
    },
    "& .rbc-event": {
      borderRadius: 4,
      padding: "4px 8px",
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.primary.contrastText,
      boxShadow: theme.shadows[0],
      transitionProperty: "box-shadow",
      transitionDuration: theme.transitions.duration.short,
      transitionTimingFunction: theme.transitions.easing.easeInOut,
      position: "relative",

      "&:hover": {
        boxShadow: theme.shadows[2]
      }
    },
    "& .rbc-event-label": {
      //   display: "none"
    },
    "& .rbc-row-segment": {
      padding: "0 4px 4px 4px"
    },
    "& .rbc-off-range-bg": {
      backgroundColor:
        theme.palette.type === "light" ? "rgba(0,0,0,0.03)" : "rgba(0,0,0,0.16)"
    },
    "& .rbc-show-more": {
      color: theme.palette.secondary.main,
      background: "transparent"
    },
    "& .rbc-addons-dnd .rbc-addons-dnd-resizable-month-event": {
      position: "static"
    },
    "& .rbc-addons-dnd .rbc-addons-dnd-resizable-month-event .rbc-addons-dnd-resize-month-event-anchor:first-child": {
      left: 0,
      top: 0,
      bottom: 0,
      height: "auto"
    },
    "& .rbc-addons-dnd .rbc-addons-dnd-resizable-month-event .rbc-addons-dnd-resize-month-event-anchor:last-child": {
      right: 0,
      top: 0,
      bottom: 0,
      height: "auto"
    }
  },
  addButton: {
    position: "absolute",
    right: 12,
    top: 172,
    zIndex: 99
  }
});

class CalendarApp extends Component {
  state = { date: new Date() };
  componentDidMount() {
    const params = this.props.match.params;
    const calendarId = params.id;
    this.props.getEvents(calendarId);
  }

  // componentDidUpdate(prevProps, prevState) {
  //   console.log(this.state);
  //   console.log(this.props);

  //   if (this.props.calendar != null) {
  //     console.log(this.props.calendar.semester.from_date);
  //     console.log("PREV");
  //     console.log(prevState.date);
  //     console.log("CURRENT");
  //     console.log(this.state.date);

  //     if (
  //       prevState.date.getTime() !=
  //       new Date(this.props.calendar.semester.from_date).getTime()
  //     ) {
  //       console.log("DATES ARE DIFFERENT");
  //       this.setState({
  //         date: new Date(this.props.calendar.semester.from_date)
  //       });
  //     } else {
  //       console.log("DATES ARE THE SAME");
  //       // this.setState({
  //       //   date: new Date(this.props.calendar.semester.from_date)
  //       // });
  //     }
  //     console.log(this.state.date);
  //   }
  // }

  moveEvent = ({ event, start, end }) => {
    this.props.updateEvent({
      ...event,
      start,
      end
    });
  };

  resizeEvent = ({ event, start, end }) => {
    delete event.type;
    this.props.updateEvent({
      ...event,
      start,
      end
    });
  };

  renderDates = (events, semesterInfo) => {
    var events2 = _.clone(events);
    var events3 = [];
    var semInfo = _.clone(semesterInfo);
    var semInfoStart = semInfo.from_date;
    var semInfoEnd = semInfo.end_date;

    events2.map(event => {
      var rInterval = 0;

      var schedDates = event.scheduledDays;
      var byweekday = [];

      if (schedDates.length > 1) {
        rInterval = schedDates.length * 13;
      } else {
        rInterval = 13;
      }
      schedDates.map(d => {
        d = d.slice(0, 2).toUpperCase();
        switch (d) {
          case "MO":
            d = 1;
            break;
          case "TU":
            d = 2;
            break;
          case "WE":
            d = 3;
            break;
          case "TH":
            d = 4;
            break;
          case "FR":
            d = 5;
            break;
          case "SA":
            d = 6;
            break;
          case "SU":
            d = 0;
            break;
          default:
            d = 0;
            break;
        }
        byweekday.push(d);
      });

      // get the time
      // hours
      var eventHourStart = event.start.getHours();
      var eventHourEnd = event.end.getHours();
      // minutes
      var eventMinuteStart = event.start.getMinutes();
      var eventMinuteEnd = event.end.getMinutes();

      var startEventYear = new Date(semInfoStart).getUTCFullYear();
      var startEventDay = new Date(semInfoStart).getUTCDay();
      var startEventMonth = new Date(semInfoStart).getUTCMonth();

      var endEventYear = new Date(semInfoEnd).getUTCFullYear();
      var endEventDay = new Date(semInfoEnd).getUTCDay();
      var endEventMonth = new Date(semInfoEnd).getUTCMonth();

      var rule = new RRule({
        freq: RRule.WEEKLY,
        dtstart: new Date(
          Date.UTC(
            startEventYear,
            startEventMonth,
            startEventDay,
            eventHourStart,
            eventMinuteStart,
            0
          )
        ),
        until: new Date(
          Date.UTC(
            endEventYear,
            endEventMonth,
            endEventDay,
            eventHourEnd,
            eventMinuteEnd,
            0
          )
        ),
        wkst: 0,
        count: rInterval,
        interval: 1,
        byweekday: byweekday
      });

      var allDates = rule.all();

      allDates.map(date => {
        var eventClone = _.clone(event);

        var newStartDate = new Date(date.setHours(eventHourStart));
        var newEndDate = new Date(date.setHours(eventHourEnd));
        newStartDate = new Date(newStartDate.setMinutes(eventMinuteStart));
        newEndDate = new Date(newEndDate.setMinutes(eventMinuteEnd));

        eventClone.start = new Date(newStartDate);

        eventClone.end = new Date(newEndDate);

        events3.push(eventClone);
      });
    });

    return events3;
  };
  handleNavigate(date, view, action) {
    this.setState({ date: moment(date).toDate() });
  }
  render() {
    const {
      classes,
      calendar,
      openNewEventDialog,
      openEditEventDialog
    } = this.props;
    let events = [];

    let semesterInfo = [];
    var semestInfoY;
    var semestInfoM;
    var semestInfoD;
    if (calendar !== null) {
      events = calendar.sections;
      semesterInfo = calendar.semester;
      semestInfoY = new Date(semesterInfo.from_date).getUTCFullYear();
      semestInfoM = new Date(semesterInfo.from_date).getUTCMonth();
      semestInfoD = new Date(semesterInfo.from_date).getUTCDay();

      // this.setState({ date: new Date(semesterInfo.from_date) });
    }

    var date1 = new Date(semestInfoY, semestInfoM, semestInfoD, 0, 0, 0, 0);
    var date2 = new Date(2019, 8, 1, 0, 0, 0);
    // console.log(date1);
    // console.log(date2);

    var sDate = new Date(semestInfoY, semestInfoM, semestInfoD, 0, 0, 0, 0);
    return (
      <div
        className={classNames(classes.root, "flex flex-col flex-auto relative")}
      >
        {this.toolbarProps && <CalendarHeader {...this.toolbarProps} />}

        <DragAndDropCalendar
          className="flex flex-1 container"
          selectable
          localizer={localizer}
          events={this.renderDates(events, semesterInfo)}
          onEventDrop={this.moveEvent}
          resizable
          onEventResize={this.resizeEvent}
          // date={semesterInfo.from_date}
          // date={this.state.date}
          defaultDate={new Date()}
          // defaultDate={this.state.date}
          defaultView={BigCalendar.Views.WEEK}
          startAccessor="start"
          endAccessor="end"
          views={allViews}
          step={10}
          timeslots={6}
          components={{
            toolbar: props => {
              this.toolbarProps = props;
              return null;
            }
          }}
          onNavigate={date => {
            this.setState({}, () => this.setState(date));
          }}
          // onNavigate={date => {
          //   this.setState({ date });
          // }}
          onSelectEvent={event => {
            openEditEventDialog(event);
          }}
          onSelectSlot={slotInfo =>
            openNewEventDialog({
              start: slotInfo.start.toLocaleString(),
              end: slotInfo.end.toLocaleString()
            })
          }
        />
        <FuseAnimate animation="transition.expandIn" delay={500}>
          <Fab
            color="secondary"
            aria-label="add"
            className={classes.addButton}
            onClick={() =>
              openNewEventDialog({
                start: new Date(),
                end: new Date()
              })
            }
          >
            <Icon>add</Icon>
          </Fab>
        </FuseAnimate>
        <EventDialog />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getEvents: Actions.getEvents,
      openNewEventDialog: Actions.openNewEventDialog,
      openEditEventDialog: Actions.openEditEventDialog,
      updateEvent: Actions.updateEvent
    },
    dispatch
  );
}

function mapStateToProps({ calendarApp }) {
  return {
    calendar: calendarApp.events.calendar
  };
}

export default withReducer("calendarApp", reducer)(
  withStyles(styles, { withTheme: true })(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(CalendarApp)
  )
);
