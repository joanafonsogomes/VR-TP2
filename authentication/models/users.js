var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    _id: String,
    name: String,
    password: String,
    level: Number
});


module.exports = mongoose.model('users', UserSchema);