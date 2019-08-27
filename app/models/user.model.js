const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
        useCreateIndex: true
    },
    name: {
        type: String,
        required: [true, 'name is required'],
    },
    password: {
        type: String,
    },
    reset_password_token: {
        type: String
    },
    reset_password_link_expiry_time: {
        type: String
    },
    login_token: {
        type: String
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

const User = mongoose.model('user', UserSchema);

function UserSchemaModel() {

}

UserSchemaModel.prototype.save = (newUserData, callback) => {
    var userData = {
        email: newUserData.email,
        name: newUserData.name
    };
    var newUser = new User(userData);
    newUser.save((error, result) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, result);
        }
    })
}

UserSchemaModel.prototype.checkForUser = (checkUserData, callback) => {
    var topicUserData = {
        email: checkUserData.email,
    };
    User.findOne(topicUserData, (error, result) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, result);
        }
    })
}

module.exports = new UserSchemaModel();