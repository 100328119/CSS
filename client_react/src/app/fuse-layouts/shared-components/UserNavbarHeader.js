import React from 'react';
import {AppBar, Avatar, Typography, withStyles} from '@material-ui/core';
import connect from 'react-redux/es/connect/connect';
import classNames from 'classnames';

const styles = theme => ({
    root  : {
        '& .user': {
            '& .username, & .email': {
                transition: theme.transitions.create('opacity', {
                    duration: theme.transitions.duration.shortest,
                    easing  : theme.transitions.easing.easeInOut
                })
            }
        }
    },
    avatar: {
				color: '#fff',
				width     : 65,
        height    : 65,
        position  : 'absolute',
        top       : 92,
        padding   : 8,
        // background: theme.palette.background.default,
        background: "#6c0000",
        boxSizing : 'content-box',
        left      : '50%',
        transform : 'translateX(-50%)',
        borderWidth: 5,
        borderColor: '#aaa',

        '& > img' : {
            borderRadius: '50%'
        }
    }
});

const UserNavbarHeader = ({user, classes}) => {
// src={user.data.photoURL && user.data.photoURL !== '' ? user.data.photoURL : "assets/images/avatars/profile.jpg"
	return (
        <AppBar
            position="static"
            color="primary"
            elevation={0}
            classes={{root: classes.root}}
            className="user relative flex flex-col items-center justify-center pt-24 pb-64 mb-32 z-0"
        >
            <Typography className="username text-16 whitespace-no-wrap" color="inherit">{user.data.displayName}</Typography>
            <Typography className="email text-13 mt-8 opacity-50 whitespace-no-wrap" color="inherit">{user.data.email}</Typography>

						<Avatar
                className={classNames(classes.avatar, "avatar")} alt="user initials" >
								{user.data.initials}
						</Avatar>
        </AppBar>
    );
};

function mapStateToProps({fuse, auth})
{
    return {
        user: auth.user
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps)(UserNavbarHeader));
