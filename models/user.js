const mongoose = require("mongoose");

const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const UserSchema = mongoose.Schema({
    phone_number: {
        type: String,
        required: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    first_name: {
        type: String,
        lowercase: true,
        required: true,
    },
    last_name: {
        type: String,
        lowercase: true,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    permission_level: {
        type: Number,
        enum: [1, 2, 3],
        required: true
    },
    community_group_id: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });


module.exports = UserSchema;