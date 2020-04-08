const mongoose = require("mongoose");

const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const CommunityGroupSchema = mongoose.Schema({
    name: { type: String, required: true, index: true }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });


module.exports = CommunityGroupSchema;