const constantsParam = require('../constants/static.js');
const UserService = require('../services/user.services');
const async = require('async');
const ConversationService = require('../services/conversation.services');
const topicService = require('../services/topic.services');

/**
 * @description topic controller get a full discussion conversation as per as topic id
 */
exports.getTopic = (req, res, next) => {
    var responseResult = {};
    try {
        var topic_id = req.params.topic_id;
        var searchData = {
            topic_id: topic_id
        };
        ConversationService.getConversationAsPerPost(searchData, (error, result) => {
            if (error) {
                responseResult.status = false;
                responseResult.message = "Something went wrong";
                return res.status(constantsParam.staticHTTPErrorMessages.INTERNAL_SERVER_ERROR.errorResponseCode).send(responseResult);
            } else {
                responseResult.status = true;
                responseResult.message = "Fetched conversation Successfully";
                responseResult.data = result;
                res.status(constantsParam.staticHTTPSuccessMessages.CREATED.successResponseCode).send(responseResult);
            }
        })
    } catch (error) {
       next(error);
    }
}

/**
 * @description topic controller to add a new conversation as per as topic id
 */
exports.addConversation = (req, res, next) => {
    var responseResult = {};
    try {
        // req.checkBody('redirect_id', 'Redirect ID is required').notEmpty();
        req.checkBody('topic_id', 'Topic ID is required').notEmpty();
        req.checkBody('message', 'Message is required').notEmpty();
        req.checkBody('name', 'Name is required').notEmpty();
        req.checkBody('email', 'Email ID is required').isEmail();
        if (req.body.reply_of_reply_flag !== null && req.body.reply_of_reply_flag !== undefined && req.body.reply_of_reply_flag !== '') {
            if (req.body.reply_of_reply_flag) {
                req.checkBody('conversation_id', 'Conversation ID is required').notEmpty();
            }
        }
        console.log(req.body);
        var errors = req.validationErrors();
        if (errors) {
            responseResult.status = false;
            responseResult.message = errors[0].msg;
            return res.status(constantsParam.staticHTTPErrorMessages.BAD_REQUEST.errorResponseCode).send(responseResult);
        } else {
            async.waterfall([
                function (callback) {
                    var topicUserDataCheck = {
                        email: req.body.email,
                        name: req.body.name
                    };
                    UserService.addOrGetTopicUserData(topicUserDataCheck, (errorTopicUser, resultTopicUser) => {
                        if (errorTopicUser) {
                            callback(errorHandler, null);
                        } else {
                            callback(null, resultTopicUser);
                        }
                    })
                },
                function (userData, callback) {
                    if (req.body.reply_of_reply_flag) {
                        var updateData = {
                            _id: req.body.conversation_id,
                            reply_of_reply_flag: req.body.reply_of_reply_flag
                        };
                        ConversationService.update(updateData, (error, result) => {
                            if (error) {
                                callback(null, userData);
                            } else {
                                callback(null, userData);
                            }
                        })
                    } else {
                        callback(null, userData);
                    }
                },
                function (userData, callback) {
                    if (req.body.reply_of_reply_flag) {
                        var topicData = {
                            redirect_id: req.body.redirect_id,
                            user_id: userData._id,
                            topic_id: req.body.topic_id,
                            conversation_id: req.body.conversation_id,
                            message: req.body.message
                        };
                    } else {
                        var topicData = {
                            redirect_id: req.body.redirect_id,
                            user_id: userData._id,
                            topic_id: req.body.topic_id,
                            message: req.body.message
                        };
                    }
                    ConversationService.addTopicConversation(topicData, (errorConversation, resultConversation) => {
                        if (errorConversation) {
                            callback(errorConversation, null);
                        } else {
                            callback(null, resultConversation);
                        }
                    })
                }
            ], function (err, result) {
                console.log(err);

                if (err) {
                    responseResult.status = false;
                    responseResult.message = "Something went wrong while adding conversation in async";
                    return res.status(constantsParam.staticHTTPErrorMessages.INTERNAL_SERVER_ERROR.errorResponseCode).send(responseResult);
                } else {
                    responseResult.status = true;
                    responseResult.message = "Conversation added Successfully";
                    responseResult.data = result;
                    res.status(constantsParam.staticHTTPSuccessMessages.CREATED.successResponseCode).send(responseResult);
                }
            });

        }
    } catch (error) {
        next(error);
    }
}

/**
 * @description topic controller add / check new topic and link it
 */
exports.addTopic = async (req, res, next) => {
    var responseResult = {};
    try {
        req.checkBody('name_of_topic', 'Name of topic is required').notEmpty();
        var errors = req.validationErrors();
        if (errors) {
            responseResult.status = false;
            responseResult.message = errors[0].msg;
            return res.status(constantsParam.staticHTTPErrorMessages.BAD_REQUEST.errorResponseCode).send(responseResult);
        } else {
            var searchData = {
                name_of_topic: req.body.name_of_topic
            }
            var checkTopic = await topicService.addTopic(searchData);
            // var allTopicData = await topicService.getAllTopic();
            if (checkTopic._id !== null && checkTopic._id !== undefined && checkTopic._id !== '') {
                responseResult.status = true;
                responseResult.data = checkTopic;
                responseResult.message = "Topic added and all topics retrived Successfully";
                res.status(constantsParam.staticHTTPSuccessMessages.CREATED.successResponseCode).send(responseResult);
            } else {
                responseResult.status = false;
                responseResult.message = "Something went wrong";
                return res.status(constantsParam.staticHTTPErrorMessages.INTERNAL_SERVER_ERROR.errorResponseCode).send(responseResult);
            }
        }
    } catch (error) {
        next(error);
    }
}

exports.getAllTopic = async (req, res, next) => {
    var responseResult = {};
    try {
        var allTopicData = await topicService.getAllTopic();
        if (allTopicData !== null && allTopicData !== undefined && allTopicData !== '') {
            responseResult.status = true;
            responseResult.data = allTopicData;
            responseResult.message = "All topics retrived Successfully";
            res.status(constantsParam.staticHTTPSuccessMessages.OK.successResponseCode).send(responseResult);
        } else {
            responseResult.status = false;
            responseResult.message = "Can't fetch topic, contact admin";
            return res.status(constantsParam.staticHTTPErrorMessages.INTERNAL_SERVER_ERROR.errorResponseCode).send(responseResult);
        }
    } catch (error) {
        next(error);
    }
}