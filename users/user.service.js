const config = require('../config.json');
const db = require('../_helpers/db');
const User = db.User;

module.exports = {
    getByEmail,
    createUser,
    updateUser,
    deleteUser
};


async function getByEmail(strEmail) {
    return await User.findOne({ email: strEmail });
}

async function createUser(userParam) {
    // validate
    if (await User.findOne({ email: userParam.email })) {
        throw 'Email "' + userParam.email + '" is already included';
    }
    const user = new User(userParam);

    // save user
    await user.save();
}

async function updateUser(id, userParam) {
    const user = await User.findById(id);
    // validate
    if (!user) throw 'User not found';
    if (user.email !== userParam.email && await User.findOne({ email: userParam.email })) {
        throw 'Email "' + userParam.email + '" is already included';
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

async function deleteUser(id) {
    await User.findByIdAndRemove(id);
}