const PostLikeSchema = require('../models/post-like');
const context = require('../context/context');
const httperror = require('http-errors');

class PostLikeRepository {

  async getAllPostLikeByPostId(postId) {
    try {
      let principal = context.get();
      let tenant = principal.thetokenInfo.tenant;
      let postLike = global.clientDbConn[tenant].model('post-like', PostLikeSchema);
      let condition = { post_id: postId };
      let result = await postLike.find(condition, { '__v': 0 }).lean();
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getAllPostLikeByPostIdCount(postId) {
    try {
      let principal = context.get();
      let tenant = principal.thetokenInfo.tenant;
      let postLike = global.clientDbConn[tenant].model('post-like', PostLikeSchema);
      let condition = { post_id: postId };
      let result = await postLike.count(condition);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async create(create_obj) {
    try {
      let principal = context.get();
      let tenant = principal.thetokenInfo.tenant;
      let postLike = global.clientDbConn[tenant].model('post-like', PostLikeSchema);
      let result = await postLike.create(create_obj);
      if (result) {
        return result.toObject();
      } else {
        throw new httperror(400, 'Bad request');
      }
    } catch (error) {
      if (error.code === 11000) {
        throw new httperror(422, 'post already liked.');
      } else {
        throw error;
      }
    }
  }

  async update(likeId, update_obj) {
    try {
      let principal = context.get();
      let tenant = principal.thetokenInfo.tenant;
      let postLike = global.clientDbConn[tenant].model('post-like', PostLikeSchema);
      let condition = { _id: likeId };
      let result = await postLike.findOneAndUpdate(condition, { $set: update_obj }, { new: true }).lean();
      if (result) {
        return result;
      } else {
        throw new httperror(400, 'Bad request');
      }
    } catch (error) {
      throw error;
    }
  }
}

exports.PostLikeRepository = PostLikeRepository;