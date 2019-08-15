const mongoose = require('mongoose');

const comment_schema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'user',
        required: [true, 'user id is required'],
    },
    post_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'post',
        required: [true, 'user id is required'],
    },
    comment_message: {
        type: String,
        required: [true, 'comment message is required']
    },
    like: {
        type: Number,
        default: 0
    },
    dislike: {
        type: Number,
        default: 0
    },
    creator_stamp: {
        type: Date,
        default: Date.now
    },
    update_stamp: {
        type: Date,
        default: Date.now
    },
});

const Comment = mongoose.model('comment', comment_schema);