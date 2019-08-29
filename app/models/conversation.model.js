const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'user',
        required: [true, 'Topic User Id is required']
    },
    topic_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'topic',
        required: [true, 'Topic Id is required']
    },
    reply_of_reply_flag: {
        type: Boolean,
        default: false
    },
    conversation_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'conversation',
    },
    message: {
        type: String,
        required: [true, 'Message is required']
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

const Conversation = mongoose.model('conversation', ConversationSchema);

function ConversationSchemaModel() {

}

ConversationSchemaModel.prototype.save = (newConversation, callback) => {
    var newConversationData = new Conversation(newConversation);
    newConversationData.save((error, result) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, result);
        }
    })
}

ConversationSchemaModel.prototype.getAsPerTopic = (searchData, callback) => {
    var search = {
        topic_id: searchData.topic_id,
        // reply_of_reply_flag: false
        conversation_id: undefined
    };
    // Conversation.find(search, (error, result) => {
        Conversation.find(search).populate('topic_id').exec(function (error, result) {
        if (error) {
            callback(error, null);
        } else {
            callback(null, result);
        }
    })
}

ConversationSchemaModel.prototype.findReplyByRedirectId = (searchData, callback) => {
    var search = {
        // _id: searchData.conversation_id,
        topic_id: searchData.topic_id,
        // reply_of_reply_flag: true,
        conversation_id: searchData.conversation_id
    };
    Conversation.find(search, (error, result) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, result);
        }
    })
}

ConversationSchemaModel.prototype.update = (data, callback) => {
    data.update_stamp = Date.now();
    Conversation.updateOne({
        _id: data._id
    }, data, (error, result) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, result);
        }
    })
}

module.exports = new ConversationSchemaModel();