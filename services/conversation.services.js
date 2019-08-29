const ConversationModel = require('../app/models/conversation.model');
const async = require('async');

exports.getConversationAsPerPost = (data, callback) => {
    var finalConversationArray = [];
    async.waterfall([
        function (callback) {
            ConversationModel.getAsPerTopic(data, (errorGetConversation, resultGetConversation) => {
                if (errorGetConversation) {
                    callback(errorGetConversation, null);
                } else {
                    callback(null, resultGetConversation);
                }
            })
        },
        function (data, callback) {
            var operations = [];
            for (let i = 0; i < data.length; i++) {
                var resultData = data[i];
                operations.push((function (resultData) {
                    return function (cb) {
                        var finalConversation = {
                            topic: {},
                            comment: {},
                            reply: [],
                        }
                        finalConversation.topic = resultData.topic_id;
                        delete resultData["topic_id"];
                        var commentData = {
                            "reply_of_reply_flag": resultData.reply_of_reply_flag,
                            "_id": resultData._id,
                            "user_id": resultData.user_id,
                            "message": resultData.message,
                            "creator_stamp": resultData.creator_stamp,
                            "update_stamp": resultData.update_stamp,
                            "__v": resultData.__v
                        }
                        finalConversation.comment = commentData;

                            console.log(resultData);
                            if((resultData.reply_of_reply_flag) && (resultData.topic_id !== null && resultData.topic_id !== undefined && resultData.topic_id !== '')) {
                        console.log("If");
                        var searchData = {
                            topic_id: resultData.topic_id,
                            reply_of_reply_flag: resultData.reply_of_reply_flag,
                            conversation_id: resultData._id
                        };
                        ConversationModel.findReplyByRedirectId(searchData, (error, result) => {
                            if (error) {
                                cb(error, null);
                            } else {
                                finalConversation.reply = result;
                                finalConversationArray.push(finalConversation);
                                cb(null, result);
                            }
                        })
                    } else {
                        console.log("else");
                        finalConversationArray.push(finalConversation);
                        cb(null, resultData);
            }
        }
                }) (resultData))
            }
async.series(operations, (errorAsync, resultAsync) => {
    // console.log("Error : ", errorAsync);
    // console.log("resultAsync : ", resultAsync);
    if (errorAsync) {
        callback(errorAsync);
    } else {
        callback(null, finalConversationArray);
    }
})
        }
    ],
function (error, result) {
    if (error) {
        callback(error, null);
    } else {
        callback(null, finalConversationArray);
    }
})
}

exports.addTopicConversation = (data, callback) => {
    ConversationModel.save(data, (error, result) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, result);
        }
    })
}

exports.update = (data, callback) => {
    ConversationModel.update(data, (error, result) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, result);
        }
    })
}