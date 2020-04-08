const PostSchema = require('../models/post');
const context = require('../context/context');
const httperror = require('http-errors');

class PostRepository {

  async getPost(postId) {
    try {
      let principal = context.get();
      let tenant = principal.thetokenInfo.tenant;
      let postModel = global.clientDbConn[tenant].model('post', PostSchema);
      let condition = { _id: postId };
      let result = await postModel.findOne(condition, { '__v': 0 }).lean();
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getPostCount(postId) {
    try {
      let principal = context.get();
      let tenant = principal.thetokenInfo.tenant;
      let postModel = global.clientDbConn[tenant].model('post', PostSchema);
      let condition = { _id: postId };
      let result = await postModel.count(condition);
      if (result > 0) {
        return result;
      } else {
        throw new httperror(400, 'Invalid Post Id');
      }
    } catch (error) {
      throw error;
    }
  }

  async getPostByCommunityGroupId(communityGroupId) {
    try {
      let principal = context.get();
      let tenant = principal.thetokenInfo.tenant;
      let postModel = global.clientDbConn[tenant].model('post', PostSchema);
      let condition = { community_group_id: communityGroupId };
      let result = await postModel.find(condition, { '__v': 0 }).sort({ created_at: -1 }).lean();
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getPostByUserId(userId) {
    try {
      let principal = context.get();
      let tenant = principal.thetokenInfo.tenant;
      let postModel = global.clientDbConn[tenant].model('post', PostSchema);
      let condition = { 'created_by.user_id': userId };
      let result = await postModel.find(condition, { '__v': 0 }).sort({ created_at: -1 }).lean();
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getAllPost() {
    try {
      let principal = context.get();
      let tenant = principal.thetokenInfo.tenant;
      let postModel = global.clientDbConn[tenant].model('post', PostSchema);
      let condition = {};
      let result = await postModel.find(condition, { '__v': 0 }).sort({ created_at: -1 }).lean();
      return result;
    } catch (error) {
      throw error;
    }
  }

  async create(create_obj) {
    try {
      let principal = context.get();
      let tenant = principal.thetokenInfo.tenant;
      let postModel = global.clientDbConn[tenant].model('post', PostSchema);
      let result = await postModel.create(create_obj);
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

exports.PostRepository = PostRepository;