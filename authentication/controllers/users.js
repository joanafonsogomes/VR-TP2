var Users = require('../models/users')

// find that user
module.exports.lookUp = id => {
    return Users.findOne({_id: id}).exec();
}

// insert a new user
module.exports.insereUser = p => {
    var newUser = new Users(p);
    return newUser.save();
}
