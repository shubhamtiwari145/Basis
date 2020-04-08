const { UserRepository } = require('../../repository/user');

class GetAllUsers {
    constructor() {
    }
    async execute() {
        try {   
            let userRepo = new UserRepository();
            let result = await userRepo.getAll();
            return result;
        } catch (error) {
            throw error;
        }
    }
}

exports.GetAllUsers = GetAllUsers;