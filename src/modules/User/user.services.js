const uuid = require("uuid").v4;

/** 
  @param - database instance (e.g User Model) 
*/

const userServices = ({ database }) => {
  const addUser = async (user) => {
    const newUser = new database({ _id: `user-${uuid()}`, ...user });
    const savedUser = newUser.save();
    return savedUser;
  };

  return Object.freeze({
    addUser,
  });
};

module.exports = userServices;
