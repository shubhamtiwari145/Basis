const { PostRepository } = require('../../repository/post');
const { PostLikeRepository } = require('../../repository/post-like');

class GetPostByUserId {
    constructor(userId) {
        this.userId = userId;
    }
    async execute() {
        try {
            let postRepository = new PostRepository();
            let postLikeRepository = new PostLikeRepository();
            let result = await postRepository.getPostByUserId(this.userId);
            for(let key in result){
                result[key].like = await postLikeRepository.getAllPostLikeByPostIdCount(result[key]._id);
                result[key].post_id = result[key]._id;
                delete result[key]._id;
            }
            return result;    
        } catch (error) {
            throw error;
        }
    }
}

exports.GetPostByUserId = GetPostByUserId;