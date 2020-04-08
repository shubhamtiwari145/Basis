const { PostLikeRepository } = require('../../repository/post-like');

class GetAllPostLikeByPostId {
    constructor(postId) {
        this.postId = postId;
    }
    async execute() {
        try {   
            let postLikeRepository = new PostLikeRepository();
            let result = await postLikeRepository.getAllPostLikeByPostId(this.postId);
            return result;
        } catch (error) {
            throw error;
        }
    }
}

exports.GetAllPostLikeByPostId = GetAllPostLikeByPostId;