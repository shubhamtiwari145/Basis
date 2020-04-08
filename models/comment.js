const mongoose = require("mongoose");

const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const CommentSchema = mongoose.Schema({
    post_id: { type: String, required: true },
    comment: { type: String, required: true },
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


module.exports = CommentSchema;