const { UserRepository } = require('../../repository/user');

class UpdateUser {
    constructor(userId, update_obj) {
        this.userId = userId;
        this.update_obj = update_obj;
    }
    async execute() {
        try {
            let userRepo = new UserRepository();
            let results = await userRepo.update(this.userId, this.update_obj);
            results['user_id'] = results._id;
            delete results._id;
            delete results.password;
            delete results.__v;
            return results;    
        } catch (error) {
            throw error;
        }
    }
}

exports.UpdateUser = UpdateUser;