const express = require('express');
const router = express.Router();
const context = require('../context/context');
const bearer = require('../security/bearer');

const { ActionManager } = require('../actions/action-manager');
const reqValidator = require('./helper-functions/req-validator/post-like');

const { GetAllPostLikeByPostId } = require('../actions/post-like/get-all-post-like-by-post-id');
const { GetAllPostLikeByPostIdCount } = require('../actions/post-like/get-all-post-like-by-post-id-count');
const { AddPostLike } = require('../actions/post-like/add-post-like');
const { UpdatePostLike } = require('../actions/post-like/update-post-like');

/**
 * @api {get} /basis/post_like/:comment_id/count Get Like Count By Post Id
 * @apiGroup  Post Likes 
 * @apiHeader {String} Authorization Bearer <token>

 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 {
    "success": true,
    "count": 1
 }

 * @apiError {String} error Error Message
 */

router.get("/:postId/count", bearer.Handler, function (req, res, next) {
  let postId = req.params.postId;
  let action = new GetAllPostLikeByPostIdCount(postId);
  ActionManager.execute(action)
    .then(data => {
      const response = {
        success: true,
        count: data
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
 * @api {get} /basis/post_like/:postId Get All Like By Post Id
 * @apiGroup  Post Likes 
 * @apiHeader {String} Authorization Bearer <token>

 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
{
    "success": true,
    "data": [
        {
            "_id": "5e8db1711945b16cf4a886f0",
            "like": true,
            "post_id": "5e8cddf1b537f17830037f8c",
            "created_by": {
                "user_id": "5e8cd73348ecd2a4e88b8610",
                "email": "johndoe@gmail.com"
            },
            "updated_by": {
                "user_id": "5e8cd73348ecd2a4e88b8610",
                "email": "johndoe@gmail.com"
            },
            "created_at": "2020-04-08T11:11:45.462Z",
            "updated_at": "2020-04-08T11:11:45.462Z"
        }
    ]
}

 * @apiError {String} error Error Message
 */

router.get("/:postId", bearer.Handler, function (req, res, next) {
  let postId = req.params.postId;
  let action = new GetAllPostLikeByPostId(postId);
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
 * @api {post} /mmb/post-like/:post_id Create PostLike
 * @apiGroup  Post Likes
 * @apiHeader {String} Authorization Bearer <token>

 * @apiParam {Boolean} like like

 
 * @apiParamExample {json} Input 
    {
     "like": true
    }
 
 * @apiSuccessExample {json} Success 
 *  HTTP/1.1 201 Created
  {
    "success": true,
    "data": "Post Like Successfully"
  }
 * @apiError {String} error Error Message
 */

router.post("/:post_id", bearer.Handler, reqValidator.createPostLikeValidation, function (req, res, next) {
  let create_obj = req.body;
  create_obj.post_id = req.params.post_id;
  let action = new AddPostLike(create_obj);
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
 * @api {patch} /mmb/post-like/:like_id Update PostLike
 * @apiGroup  Post Likes
 * @apiHeader {String} Authorization Bearer <token>

 * @apiParam {Boolean} like like
 
 * @apiParamExample {json} Input 
  {
	   "like": true
   }
 * @apiSuccessExample {json} Success
 *  HTTP/1.1 200 OK
  {
    "success": true,
    "data": "Like Updated Successfully"
}
 * @apiError {String} error Error Message
 */


router.patch('/:like_id', bearer.Handler,  reqValidator.updatePostLikeValidation, function (req, res, next) {
  let likeId = req.params.like_id;
  let update_obj = req.body;
  let action = new UpdatePostLike(likeId, update_obj);
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