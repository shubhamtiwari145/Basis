const CommunityGroupSchema = require('../models/community-group');
const context = require('../context/context');
const httperror = require('http-errors');

class CommunityGroupRepository {

  async getTenant() {
    return 'basis';
  }

  async getCommunityGroupByName(communityName) {
    try {
      let tenant = await this.getTenant();
      let communityGroup = global.clientDbConn[tenant].model('community-group', CommunityGroupSchema);
      let condition = { name: communityName };
      let result = await communityGroup.findOne(condition, { '__v': 0 }).lean();
      return result;
    } catch (error) {
      throw error;
    }
  }

  async create(create_obj) {
    try {
      let tenant = await this.getTenant();
      let communityGroup = global.clientDbConn[tenant].model('community-group', CommunityGroupSchema);
      let result = await communityGroup.create(create_obj);
      if (result) {
        return result.toObject();
      } else {
        throw new httperror(400, 'Bad request');
      }
    } catch (error) {
      if (error.code === 11000) {
        throw new httperror(422, 'community name already exists');
      } else {
        throw error;
      }
    }
  }

}

exports.CommunityGroupRepository = CommunityGroupRepository;