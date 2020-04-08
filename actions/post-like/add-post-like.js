const { PostLikeRepository } = require('../../repository/post-like');
const { UserRepository } = require('../../repository/user');
const { PostRepository } = require('../../repository/post');

const context = require('../../context/context');
const httperror = require('http-errors');

class AddPostLike {
    constructor(create_obj) {
        this.create_obj = create_obj;
        this.communityGroup = 'basis';
    }
    async execute() {
        try {
            let postLikeRepository = new PostLikeRepository();
            let postRepository = new PostRepository();
            let userRepo = new UserRepository();

            let principal = context.get();
            let user_id = principal.thetokenInfo.userId;
            let email = principal.thetokenInfo.email;
            let name = principal.thetokenInfo.first_name;
            let userDetails = {
                user_id: user_id,
                name: name,
                email: email
            };
            this.create_obj.created_by = userDetails;
            this.create_obj.updated_by = userDetails;
            let [userDetail, checkPostId] = await Promise.all([
                await userRepo.getByUserId(user_id),
                await postRepository.getPostCount(this.create_obj.post_id)
            ]);
            if (userDetail.permission_level === 2 || userDetail.permission_level === 3) {
                await postLikeRepository.create(this.create_obj);
                return 'Post Liked Successfully';
            } else {
                throw new httperror(403, `You don't have access to create comment.`);
            }
        } catch (error) {
            throw error;
        }
    }
}

exports.AddPostLike = AddPostLike;