const { CommentRepository } = require('../../repository/comment');

class GetCommentById {
    constructor(commentId) {
        this.commentId = commentId;
    }
    async execute() {
        try {   
            let commentRepository = new CommentRepository();
            let result = await commentRepository.getComment(this.commentId);
            return result;
        } catch (error) {
            throw error;
        }
    }
}

exports.GetCommentById = GetCommentById;