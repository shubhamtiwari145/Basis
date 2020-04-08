const mongoose = require("mongoose");

const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;


const PostSchema = mongoose.Schema({
    link: { type: String, required: true },
    like: { type: Number, default: 0 },
    community_group_id: {
        type: String,
        required: true
    },
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


module.exports = PostSchema;