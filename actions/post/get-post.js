const { PostRepository } = require('../../repository/post');
const { PostLikeRepository } = require('../../repository/post-like');

class GetPost {
    constructor(postId) {
        this.postId = postId;
    }
    async execute() {
        try {   
            let postRepository = new PostRepository();
            let postLikeRepository = new PostLikeRepository();
            let result = await postRepository.getPost(this.postId);
            result.like = await postLikeRepository.getAllPostLikeByPostIdCount(this.postId);
            result.post_id = result._id;
            delete result._id;
            return result;
        } catch (error) {
            throw error;
        }
    }
}

exports.GetPost = GetPost;