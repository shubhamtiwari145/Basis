const { UserRepository } = require('../../repository/user');

class GetUserDetail {
    constructor(userId) {
        this.userId = userId;
    }
    async execute() {
        try {   
            let userRepo = new UserRepository();
            let userDetail = await userRepo.getByUserId(this.userId);
            if (!userDetail) throw new Error('Invalid email or password');
            userDetail['user_id'] = userDetail._id;
            delete userDetail._id;
            return userDetail;
        } catch (error) {
            throw error;
        }
    }
}

exports.GetUserDetail = GetUserDetail;