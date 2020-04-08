const express = require('express');
const router = express.Router();
const context = require('../context/context');
const bearer = require('../security/bearer');

const { ActionManager } = require('../actions/action-manager');
const reqValidator = require('./helper-functions/req-validator/user');

const { GetUserDetail } = require('../actions/user/get-user');
const { SignUpUser } = require('../actions/user/add-user');
const { UserLogin } = require('../actions/user/user-login');
const { UpdateUser } = require('../actions/user/update-user');



/**
 * @api {post} /basis/user Login User
 * @apiGroup  Users
 * @apiHeader {String} Authorization Bearer <token>
 * 
 * @apiParam {String} phone_number phone number(only 10 digits allowed)
 * @apiParam {String} password password

  * @apiParamExample {json} Input 
{
      "phone_number": "1234567891",
      "password": "123456"
}

 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 {
    "success": true,
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOGNkNzMzNDhlY2QyYTRlODhiODYxMCIsImZpcnN0X25hbWUiOiJqb2huIiwibGFzdF9uYW1lIjoiZG9lIiwiZW1haWwiOiJqb2huZG9lQGdtYWlsLmNvbSIsInBob25lX251bWJlciI6IjEyMzQ1Njc4OTAiLCJ0ZW5hbnQiOiJiYXNpcyIsImV4cGlyZXMiOjE1ODYzNDg0OTcsImlhdCI6MTU4NjMzNzY5NiwiZXhwIjoxNTg2MzQ4NDk2fQ.gMb97jlYUFsi3iGD8F5c2q3SjiqN3zOAbVfFl2niCcc",
        "realname": "john",
        "userid": "5e8cd73348ecd2a4e88b8610"
    }
}
 * @apiError {String} error Error Message
 */

router.post('/login', reqValidator.userLoginValidation, function (req, res, next) {
  let phone_number = req.body.phone_number;
  let password = req.body.password;
  let action = new UserLogin(phone_number, password);
  ActionManager.execute(action)
    .then(data => {
      const response = {
        success: true,
        data: data
      };
      res.status(200).send(response);
    })
    .catch(error => {
      const response = {
        success: false,
        data: error.message
      };
      res.status(error.status || 400).send(response);
    });
});

/**
 * @api {get} /basis/user Get User detail
 * @apiGroup Users
 * @apiHeader {String} Authorization Bearer <token>

 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
{
    "success": true,
    "data": {
        "active": true,
        "first_name": "john",
        "last_name": "doe",
        "email": "johndoe@gmail.com",
        "phone_number": "1234567890",
        "permission_level": "3",
        "community_group_id": "5e8cd03c1a724d7974b30c1b",
        "created_at": "2020-04-07T19:18:50.590Z",
        "updated_at": "2020-04-07T19:18:50.590Z",
        "user_id": "5e8cd21a2d6ced9efcbd7a3e"
    }
}

 * @apiError {String} error Error Message
 */

router.get('/', bearer.Handler, function (req, res, next) {
  let principal = context.get();
  let userId = principal.thetokenInfo.userId;
  let action = new GetUserDetail(userId);
  ActionManager.execute(action)
    .then(data => {
      const response = {
        success: true,
        data: data
      };
      res.status(200).send(response);
    })
    .catch(error => {
      const response = {
        success: false,
        data: error.message
      };
      res.status(error.status || 400).send(response);
    });
});



/**
 * @api {post} /basis/user/sign_up Sign Up User
 * @apiGroup Users
 * @apiHeader {String} Authorization Bearer <token>

 * @apiParam {String} first_name first name
 * @apiParam {String} [last_name] last name
 * @apiParam {String} email email
 * @apiParam {String} phone_number phone number(only 10 digits allowed)
 * @apiParam {String} password password

 
 * @apiParamExample {json} Input 
{
      "first_name": "john",
      "last_name": "doe",
      "email": "johndoe@gmail.com",
      "phone_number": "1234567891",
      "password": "123456"
}
 
 * @apiSuccessExample {json} Success 
 *  HTTP/1.1 201 Created
 {
    "success": true,
    "data": "Signed Up Successfully"
 }
 * @apiError {String} error Error Message
 */

router.post('/sign_up', reqValidator.userSignUpValidation, function (req, res, next) {
  let create_obj = req.body;
  let action = new SignUpUser(create_obj);
  ActionManager.execute(action)
    .then(data => {
      const response = {
        success: true,
        data: data
      };
      res.status(201).send(response);
    })
    .catch(error => {
      const response = {
        success: false,
        data: error.message
      };
      res.status(error.status || 400).send(response);
    });
});

/**
 * @api {patch} /basis/user Update User detail
 * @apiGroup  Users
 * @apiHeader {String} Authorization Bearer <token>

 * @apiParam {String} first_name first name
 * @apiParam {String} [last_name] last name
  
 * @apiParamExample {json} Input 
    {
      "first_name": "john",
      "last_name": "wick",
    }
 * @apiSuccessExample {json} Success
 *  HTTP/1.1 200 OK
{
    "success": true,
    "data": {
        "active": true,
        "first_name": "john",
        "last_name": "wick",
        "email": "johndoe@gmail.com",
        "phone_number": "1234567890",
        "permission_level": "3",
        "community_group_id": "5e8cd03c1a724d7974b30c1b",
        "created_at": "2020-04-07T19:18:50.590Z",
        "updated_at": "2020-04-07T19:18:50.590Z",
        "user_id": "5e8cd21a2d6ced9efcbd7a3e"
    }
}
 * @apiError {String} error Error Message
 */


router.patch('/', bearer.Handler, reqValidator.updateUserValidation, function (req, res, next) {
  let principal = context.get();
  let userId = principal.thetokenInfo.userId;
  let update_obj = req.body;
  let action = new UpdateUser(userId, update_obj);
  ActionManager.execute(action).then(data => {
    const response = {
      success: true,
      data: data
    }
    res.status(200).send(response);
  }).catch((error) => {
    const response = {
      success: false,
      data: error.message
    }
    res.status(error.status || 400).send(response);
  })
});


module.exports = router;