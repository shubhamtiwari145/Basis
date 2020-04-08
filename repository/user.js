const UserSchema = require('../models/user');
const httperror = require('http-errors');

class UserRepository {

  async getTenant() {
    return 'basis';
  }

  async getByUserId(userId) {
    try {
      let tenant = await this.getTenant();
      let userModel = global.clientDbConn[tenant].model('user', UserSchema);
      let condition = { _id: userId };
      let result = await userModel.findOne(condition, { '__v': 0, 'password': 0 }).lean();
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getUserWithPassword(phone_number) {
    try {
      let tenant = await this.getTenant();
      let userModel = global.clientDbConn[tenant].model('user', UserSchema);
      let condition = { phone_number: phone_number };
      let result = await userModel.findOne(condition, { '__v': 0 }).lean();
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      let tenant = await this.getTenant();
      let userModel = global.clientDbConn[tenant].model('user', UserSchema);
      let condition = {};
      let result = await userModel.find(condition, { '__v': 0 }).lean();
      return result;
    } catch (error) {
      throw error;
    }
  }

  async create(create_obj) {
    try {
      let tenant = await this.getTenant();
      let userModel = global.clientDbConn[tenant].model('user', UserSchema);
      let result = await userModel.create(create_obj);
      if (result) {
        return result.toObject();
      } else {
        throw new httperror(400, 'Bad request');
      }
    } catch (error) {
      if (error.code === 11000) {
        throw new httperror(409, 'Email or Phone No. already exists.');
      } else {
        throw error;
      }
    }
  }

  async update(userId, update_obj) {
    try {
      let tenant = await this.getTenant();
      let userModel = global.clientDbConn[tenant].model('user', UserSchema);
      let condition = { _id: userId };
      let result = await userModel.findOneAndUpdate(condition, { $set: update_obj }, { new: true }).lean();
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

exports.UserRepository = UserRepository;