const { PostLikeRepository } = require('../../repository/post-like');

class GetAllPostLikeByPostIdCount {
    constructor(postId) {
        this.postId = postId;
    }
    async execute() {
        try {   
            let postLikeRepository = new PostLikeRepository();
            let result = await postLikeRepository.getAllPostLikeByPostIdCount(this.postId);
            return result;
        } catch (error) {
            throw error;
        }
    }
}

exports.GetAllPostLikeByPostIdCount = GetAllPostLikeByPostIdCount;