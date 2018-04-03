const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    postCount: Number
});

const User = mongoose.model('user', UserSchema);

module.exports = User;