const express = require('express');
const router = express.Router();
const Topic = require('../controller/topic.controller');

/**
 * @description api route for adding a conversation in the discussion
 */
router.post('/topic/conversation', Topic.addConversation);

/**
 * @description api route to get all the discussions held for a particular post
 */
router.get('/topic/:topic_id', Topic.getTopic);

/**
 * @description api route to add and topic
 */
router.post('/topic', Topic.addTopic);

/**
 * @description api route to get all topics
 */
router.get('/topic', Topic.getAllTopic);

/**
 * @description exporting all the router module for accessing it in server.js file
 */
module.exports = router;