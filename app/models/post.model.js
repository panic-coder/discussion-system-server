const mongoose = require('mongoose');

const post_schema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'user',
        required: [true, 'user id is required'],
    },
    post_message: {
        type: String,
        required: [true, 'post message is required']
    },
    image_link: {
        type: String,
        required: [true, 'image link is required'],
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

const Post = mongoose.model('post', post_schema);