const uuid = require('uuid').v4;

/**
  @param - database instance (e.g User Model)
*/

const userServices = ({ Database }) => {
  const addUser = async (user) => {
    const newUser = new Database({ _id: `user-${uuid()}`, ...user });
    const savedUser = newUser.save();
    return savedUser;
  };

  return Object.freeze({
    addUser,
  });
};

module.exports = userServices;
