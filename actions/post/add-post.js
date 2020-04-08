const { PostRepository } = require('../../repository/post');
const { UserRepository } = require('../../repository/user');

const context = require('../../context/context');
const httperror = require('http-errors');

class AddPost {
    constructor(create_obj) {
        this.create_obj = create_obj;
        this.communityGroup = 'basis';
    }
    async execute() {
        try {
            let postRepository = new PostRepository();
            let userRepo = new UserRepository();
            let principal = context.get();
            let user_id = principal.thetokenInfo.userId;
            let email = principal.thetokenInfo.email;
            let name = principal.thetokenInfo.name;
            let userDetails = {
                user_id: user_id,
                name: name,
                email: email
            };
            this.create_obj.created_by = userDetails;
            this.create_obj.updated_by = userDetails;
            let userDetail = await userRepo.getByUserId(user_id);
            if (userDetail.permission_level === 2 || userDetail.permission_level === 3) {
                this.create_obj.community_group_id = userDetail.community_group_id;
                await postRepository.create(this.create_obj);
                return `Post Created Successfully.`;
            } else {
                throw new httperror(403, `You don't have access to create post.`);
            }

        } catch (error) {
            throw error;
        }
    }
}

exports.AddPost = AddPost;