//3rd party library
const express = require('express');
const secure = require('express-promise-router')();
const passport = require('passport');
//customize library
const UserController = require('../controller/user');
const {validateBody, schema} = require('../helper/routeHelper');
const passportConfig = require('../passport');
const {UserSchema, User} = require('../model/user');

// needs to be refactor..
//login/logout/register
secure.route('/register')
  .post(validateBody(schema.authSchema),UserController.Register);

secure.route('/signin')
  .post(passport.authenticate('local',{session:false}),UserController.signIn);

secure.route('/auth/access-token')
  .get(passport.authenticate('jwt',{session:false}),UserController.TokenSignin);

secure.route('/update/profile')
  .put(passport.authenticate('jwt',{session:false}),UserController.UpdateProfile);

secure.route('/secret')
  .get(passport.authenticate('jwt',{session:false}),UserController.secret);

secure.route('/users')
  .get(passport.authenticate('jwt',{session:false}),UserController.getAllUsers);

secure.route('/user/:_id')
  .get(passport.authenticate('jwt',{session:false}), UserController.getUserByID)
  .put(passport.authenticate('jwt',{session:false}), UserController.updateUserByID)
  .delete(passport.authenticate('jwt',{session:false}), UserController.deleteUserByID)


module.exports = secure;
