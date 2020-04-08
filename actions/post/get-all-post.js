const { PostRepository } = require('../../repository/post');
const { PostLikeRepository } = require('../../repository/post-like');

class GetAllPost {
    constructor() {
    }
    async execute() {
        try {   
            let postRepository = new PostRepository();
            let postLikeRepository = new PostLikeRepository();
            let result = await postRepository.getAllPost();
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

exports.GetAllPost = GetAllPost;