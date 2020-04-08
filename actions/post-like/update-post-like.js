const { PostLikeRepository } = require('../../repository/post-like');

class UpdatePostLike {
    constructor(likeId, update_obj) {
        this.likeId = likeId;
        this.update_obj = update_obj;
    }
    async execute() {
        try {
            let postLikeRepository = new PostLikeRepository();
            await postLikeRepository.update(this.likeId, this.update_obj);
            return "PostLike Updated Successfully";    
        } catch (error) {
            throw error;
        }
    }
}

exports.UpdatePostLike = UpdatePostLike;