import React from 'react';
import {Typography, withStyles} from '@material-ui/core';
import classNames from 'classnames';

const styles = theme => ({
    root      : {
        '& .logo-icon': {
            width     : 40,
            height    : 40,
            transition: theme.transitions.create(['width', 'height'], {
                duration: theme.transitions.duration.shortest,
                easing  : theme.transitions.easing.easeInOut
            })
        }
    },
    reactBadge: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        color          : '#61dafb'
    },
    leftSideHeader: {
      backgroundColor: "white",
      margin: 0,
      height: 65
    }
});

function Logo({classes})
{
    return (
      <div
        className={classNames(
          classes.root,
          classes.leftSideHeader,
          "flex items-center"
        )}
      >
        <img
          className="logo-icon"
          src="https://www.kpu.ca/sites/all/themes/kwantlen_v3/img/logo.svg"
          alt="logo"
        />
        <Typography className="text-16 ml-8 font-light logo-text">
          COURSE PLANNING
        </Typography>

        {/* <div
          className={classNames(
            classes.reactBadge,
            "react-badge flex items-center ml-12 mr-8 py-4 px-8 rounded"
          )}
        >
          <img
            className="react-logo"
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K"
            alt="react"
            width="16"
          />
          <span className="react-text text-12 ml-4">COURSE PLANNING TOOL</span>
        </div> */}
        </div>
    );
}

export default withStyles(styles, {withTheme: true})(Logo);
