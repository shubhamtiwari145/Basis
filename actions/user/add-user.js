const { UserRepository } = require('../../repository/user');
const { CommunityGroupRepository } = require('../../repository/community-group');

const md5 = require('md5');

class SignUpUser {
    constructor(create_obj) {
        this.create_obj = create_obj;
        this.communityGroup = 'basis';
    }
    async execute() {
        try {
            let userRepo = new UserRepository();
            let communityGroupRepository = new CommunityGroupRepository();

            let lastDigitMobNo = parseInt(this.create_obj.phone_number.slice(-1));
            if (lastDigitMobNo === 0) {
                this.create_obj.permission_level = 3;
            } else {
                this.create_obj.permission_level = lastDigitMobNo % 2 === 0 ? 2 : 1;
            }

            this.create_obj.password = md5(this.create_obj.password);

            let communityResult = await communityGroupRepository.getCommunityGroupByName(this.communityGroup);
            if (!communityResult) {
                let communityObj = { 'name': this.communityGroup };
                communityResult = await communityGroupRepository.create(communityObj);
            };

            this.create_obj.community_group_id = communityResult._id;
            let results = await userRepo.create(this.create_obj);
            return `Signed Up Successfully`;
        } catch (error) {
            throw error;
        }
    }
}

exports.SignUpUser = SignUpUser;