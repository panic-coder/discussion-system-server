const mongoose = require('mongoose');

const reply_schema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'user',
        required: [true, 'user id is required'],
    },
    post_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'post',
        required: [true, 'user id is required'],
    },
    comment_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'comment',
        required: [true, 'comment id is required'],
    },
    reply_message: {
        type: String,
        required: [true, 'reply message is required']
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

const Reply = mongoose.model('reply', reply_schema);