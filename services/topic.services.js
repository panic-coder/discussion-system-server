const topicModel = require('../app/models/topic.model');
const async = require('async');

exports.addTopic = (topicData) => {
    return new Promise(function (resolve, reject) {
        async.waterfall([
            function (callback) {
                topicModel.save(topicData, (error, result) => {
                    if (error) {
                        callback(error, null);
                    } else {
                        callback(null, result);
                    }
                })
            }
        ],
            function (error, result) {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            })
    })
}

exports.getAllTopic = () => {
    return new Promise(function (resolve, reject) {
        topicModel.getAllTopic((error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        })
    })
}