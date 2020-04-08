const express = require('express');
const router = express.Router();
const context = require('../context/context');
const bearer = require('../security/bearer');

const { ActionManager } = require('../actions/action-manager');
const reqValidator = require('./helper-functions/req-validator/post');

const { GetPost } = require('../actions/post/get-post');
const { GetAllPost } = require('../actions/post/get-all-post');
const { GetPostByUserId } = require('../actions/post/get-post-by-user-id');
const { GetPostByCommunityGroupId } = require('../actions/post/get-post-by-community-group-id');
const { AddPost } = require('../actions/post/add-post');






/**
 * @api {get} /basis/posts Get Post By Community Group Id
 * @apiGroup  Posts
 * @apiHeader {String} Authorization Bearer <token>

 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
{
    "success": true,
    "data": {
        "post_id": "5e8cd754a932da5bc01de1da",
        "link": "google.com",
         "like": 1,
        "created_by": {
            "user_id": "5e8cd73348ecd2a4e88b8610",
            "name": "john",
            "email": "johndoe@gmail.com"
        },
        "updated_by": {
            "user_id": "5e8cd73348ecd2a4e88b8610",
            "name": "john",
            "email": "johndoe@gmail.com"
        },
        "community_group_id": "5e8cd03c1a724d7974b30c1b",
        "created_at": "2020-04-07T19:41:09.009Z",
        "updated_at": "2020-04-07T19:41:09.009Z"
    }
}

 * @apiError {String} error Error Message
 */

router.get("/:community_group_id/community_group", bearer.Handler, function (req, res, next) {
  let communityGroupId = req.params.community_group_id;
  let action = new GetPostByCommunityGroupId(communityGroupId);
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
 * @api {get} /basis/posts/:postId Get Post By Post Id
 * @apiGroup  Posts
 * @apiHeader {String} Authorization Bearer <token>

 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
{
    "success": true,
    "data": {
        "post_id": "5e8cd754a932da5bc01de1da",
        "link": "google.com",
        "like": 1,
        "created_by": {
            "user_id": "5e8cd73348ecd2a4e88b8610",
            "name": "john",
            "email": "johndoe@gmail.com"
        },
        "updated_by": {
            "user_id": "5e8cd73348ecd2a4e88b8610",
            "name": "john",
            "email": "johndoe@gmail.com"
        },
        "community_group_id": "5e8cd03c1a724d7974b30c1b",
        "created_at": "2020-04-07T19:41:09.009Z",
        "updated_at": "2020-04-07T19:41:09.009Z"
    }
}

 * @apiError {String} error Error Message
 */

router.get("/:postId", bearer.Handler, function (req, res, next) {
  let postId = req.params.postId;
  let action = new GetPost(postId);
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
 * @api {get} /basis/posts/:userId/user Get Post By User Id
 * @apiGroup  Posts
 * @apiHeader {String} Authorization Bearer <token>

 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
{
    "success": true,
    "data": [
        {
            "post_id": "5e8cd754a932da5bc01de1da",
            "link": "google.com",
             "like": 1,
            "created_by": {
                "user_id": "5e8cd73348ecd2a4e88b8610",
                "name": "john",
                "email": "johndoe@gmail.com"
            },
            "updated_by": {
                "user_id": "5e8cd73348ecd2a4e88b8610",
                "name": "john",
                "email": "johndoe@gmail.com"
            },
            "community_group_id": "5e8cd03c1a724d7974b30c1b",
            "created_at": "2020-04-07T19:41:09.009Z",
            "updated_at": "2020-04-07T19:41:09.009Z"
        }
    ]
}

 * @apiError {String} error Error Message
 */

router.get("/:userId/user", bearer.Handler, function (req, res, next) {
  let userId = req.params.userId;
  let action = new GetPostByUserId(userId);
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
 * @api {get} /basis/posts Get All Post
 * @apiGroup  Posts 
 * @apiHeader {String} Authorization Bearer <token>

 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
{
    "success": true,
    "data": [
        {
            "post_id": "5e8cd754a932da5bc01de1da",
            "link": "google.com",
             "like": 1,
            "created_by": {
                "user_id": "5e8cd73348ecd2a4e88b8610",
                "name": "john",
                "email": "johndoe@gmail.com"
            },
            "updated_by": {
                "user_id": "5e8cd73348ecd2a4e88b8610",
                "name": "john",
                "email": "johndoe@gmail.com"
            },
            "community_group_id": "5e8cd03c1a724d7974b30c1b",
            "created_at": "2020-04-07T19:41:09.009Z",
            "updated_at": "2020-04-07T19:41:09.009Z"
        }
    ]
}

 * @apiError {String} error Error Message
 */

router.get("/", bearer.Handler, function (req, res, next) {
  let action = new GetAllPost();
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
 * @api {post} /basis/posts Create Post
 * @apiGroup  Posts  
 * @apiHeader {String} Authorization Bearer <token>

 * @apiParam {String} link Link to be shared
 
 * @apiParamExample {json} Input 
   {
	  "link":"google.com"	
   }
 
 * @apiSuccessExample {json} Success 
 *  HTTP/1.1 201 Created
  {
    "success": true,
    "data": "Post Created Successfully."
  }
 * @apiError {String} error Error Message
 */

router.post("/", bearer.Handler, reqValidator.createPostValidation, function (req, res, next) {
  let create_obj = req.body;
  let action = new AddPost(create_obj);
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


module.exports = router;