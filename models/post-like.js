const mongoose = require("mongoose");

const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const CommentSchema = mongoose.Schema({
    post_id: { type: String, required: true },
    like: { type: Boolean, required: true },
    created_by: {
        user_id: { type: String, required: false },
        name: { type: String, required: false },
        email: { type: String, required: false }
    },
    updated_by: {
        user_id: { type: String, required: false },
        name: { type: String, required: false },
        email: { type: String, required: false }
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

CommentSchema.index({ 'post_id': 1, 'created_by.user_id': 1 }, { unique: true });



module.exports = CommentSchema;