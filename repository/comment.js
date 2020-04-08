const CommentSchema = require('../models/comment');
const context = require('../context/context');
const httperror = require('http-errors');

class CommentRepository {

  async getComment(commentId) {
    try {
      let principal = context.get();
      let tenant = principal.thetokenInfo.tenant;
      let commentModel = global.clientDbConn[tenant].model('comment', CommentSchema);
      let condition = { _id: commentId };
      let result = await commentModel.find(condition, { '__v': 0 }).lean();
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getAllCommentByPostId(postId) {
    try {
      let principal = context.get();
      let tenant = principal.thetokenInfo.tenant;
      let commentModel = global.clientDbConn[tenant].model('comment', CommentSchema);
      let condition = { post_id: postId };
      let result = await commentModel.find(condition, { '__v': 0 }).sort({ created_at: -1 }).lean();
      return result;
    } catch (error) {
      throw error;
    }
  }

  async create(create_obj) {
    try {
      let principal = context.get();
      let tenant = principal.thetokenInfo.tenant;
      console.log('tenant', tenant, create_obj);
      let commentModel = global.clientDbConn[tenant].model('comment', CommentSchema);
      let result = await commentModel.create(create_obj);
      if (result) {
        return result.toObject();
      } else {
        throw new httperror(400, 'Bad request');
      }
    } catch (error) {
        throw error;
    }
  }

}

exports.CommentRepository = CommentRepository;