const userModel = require('../app/models/user.model');

exports.addOrGetTopicUserData = (topicUserData, callback) => {
    userModel.checkForUser(topicUserData, (errorTopicUser, resultTopicUser) => {
        if (errorTopicUser) {
            callback(errorTopicUser, null);
        } else if (resultTopicUser === null) {
            userModel.save(topicUserData, (error, result) => {
                if (error) {
                    callback(error, null);
                } else {
                    callback(null, result);
                }
            })
        } else {
            callback(null, resultTopicUser);
        }
    })
}