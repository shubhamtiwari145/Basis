const { CommentRepository } = require('../../repository/comment');

class GetAllCommentByPostId {
    constructor(postId) {
        this.postId = postId;
    }
    async execute() {
        try {   
            let commentRepository = new CommentRepository();
            let result = await commentRepository.getAllCommentByPostId(this.postId);
            return result;
        } catch (error) {
            throw error;
        }
    }
}

exports.GetAllCommentByPostId = GetAllCommentByPostId;