const mongoose = require('mongoose');

const TopicSchema = new mongoose.Schema({
    name_of_topic: {
        type: String,
        text: true
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

const Topic = mongoose.model('topic', TopicSchema);

function TopicSchemaModel() {

}

TopicSchemaModel.prototype.save = (newTopicData, callback) => {
    var topicData = {
        name_of_topic: newTopicData.name_of_topic,
    };
    var newTopic = new Topic(topicData);
    newTopic.save((error, result) => {
        if (error) {
            callback(error, null);
        } else {
            console.log(result);
            callback(null, result);
        }
    })
}

TopicSchemaModel.prototype.checkTopic = (checkTopicData, callback) => {
    var topicData = {
        name_of_topic: checkTopicData.name_of_topic,
    };
    Topic.findOne(topicData, (error, result) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, result);
        }
    })
}

module.exports = new TopicSchemaModel();