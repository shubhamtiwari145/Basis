const express = require('express');
const router = express.Router();
const context = require('../context/context');
const bearer = require('../security/bearer');

const { ActionManager } = require('../actions/action-manager');
const reqValidator = require('./helper-functions/req-validator/comment');

const { GetCommentById } = require('../actions/comment/get-comment');
const { GetAllCommentByPostId } = require('../actions/comment/get-all-comment-by-post-id');
const { AddComment } = require('../actions/comment/add-comment');


/**
 * @api {get} /basis/comments/:comment_id Get Comment By Id
 * @apiGroup  Comments 
 * @apiHeader {String} Authorization Bearer <token>

 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
{
    "success": true,
    "data": [
        {
            "_id": "5e8cdd7a3b15597f00f51190",
            "post_id": "5e8cd754a932da5bc01de1da",
            "comment": "This is a comment",
            "created_by": {
                "user_id": "5e8cd73348ecd2a4e88b8610",
                "email": "johndoe@gmail.com"
            },
            "updated_by": {
                "user_id": "5e8cd73348ecd2a4e88b8610",
                "email": "johndoe@gmail.com"
            },
            "created_at": "2020-04-07T20:07:22.140Z",
            "updated_at": "2020-04-07T20:07:22.140Z"
        }
    ]
}

 * @apiError {String} error Error Message
 */

router.get("/:comment_id", bearer.Handler, function (req, res, next) {
  let commentId = req.params.comment_id;
  let action = new GetCommentById(commentId);
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
* @api {get} /basis/comments/:post_id/post Get Comment By Post Id
 * @apiGroup  Comments  
 * @apiHeader {String} Authorization Bearer <token>

 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
{
    "success": true,
    "data": [
        {
            "_id": "5e8cdd7a3b15597f00f51190",
            "post_id": "5e8cd754a932da5bc01de1da",
            "comment": "this is a comment",
            "created_by": {
                "user_id": "5e8cd73348ecd2a4e88b8610",
                "email": "johndoe@gmail.com"
            },
            "updated_by": {
                "user_id": "5e8cd73348ecd2a4e88b8610",
                "email": "johndoe@gmail.com"
            },
            "created_at": "2020-04-07T20:07:22.140Z",
            "updated_at": "2020-04-07T20:07:22.140Z"
        }
    ]
}

 * @apiError {String} error Error Message
 */

router.get("/:post_id/post", bearer.Handler, function (req, res, next) {
  let postId = req.params.post_id;
  let action = new GetAllCommentByPostId(postId);
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
 * @api {post} /basis/comments/:post_id Create Comment
 * @apiGroup  Comments  
 * @apiHeader {String} Authorization Bearer <token>

 * @apiParam {String} comment comment
 
 * @apiParamExample {json} Input 
 {
    "comment": "this is a comment"
  }
 
 * @apiSuccessExample {json} Success 
 *  HTTP/1.1 201 Created
  {
    "success": true,
    "data": "Comment Created Successfully"
  }
 * @apiError {String} error Error Message
 */

router.post("/:post_id", bearer.Handler, reqValidator.createCommentValidation, function (req, res, next) {
  let create_obj = req.body;
  create_obj.post_id = req.params.post_id;
  let action = new AddComment(create_obj);
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