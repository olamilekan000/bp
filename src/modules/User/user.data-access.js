const uuid = require('uuid').v4;

/**
  @param - database instance (e.g User Model)
*/

const UserDataAccess = ({ UserModel }) => {
  const createUser = async (user) => {
    const newUser = new UserModel({ _id: `user-${uuid()}`, ...user });
    const savedUser = newUser.save();
    return savedUser;
  };

  const getUsers = async (params = {}) => {
    const users = await UserModel.find(params).lean().exec();
    return users;
  };

  const findUserByParams = async (params = {}) => {
    const user = await UserModel
      .findOne({ ...params, deleted: { $ne: true } })
      .select('-password')
      .lean()
      .exec();

    return user;
  };

  const findUserAndUpdate = async (_id, params = {}) => {
    const user = await UserModel.findOneAndUpdate(
      { _id },
      {
        $set: {
          ...params,
        },
      },
      { new: true },
    );
    return await user.save();
  };

  const deleteUser = async (_id, params = {}) => {
    const user = await UserModel.findOneAndDelete(
      { _id },
      params,
    );
    return user;
  };

  return {
    createUser,
    getUsers,
    findUserByParams,
    findUserAndUpdate,
    deleteUser,
  };
};

module.exports = UserDataAccess;
