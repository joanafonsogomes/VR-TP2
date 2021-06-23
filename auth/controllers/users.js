var Users = require('../models/users')

	
/**
 * Find a User
 */
module.exports.lookUp = id => {
    return Users.findOne({_id: id}).exec();
}

/**
 * Insert a new User
 */
module.exports.insereUser = p => {
    var newUser = new Users(p);
    return newUser.save();
}
