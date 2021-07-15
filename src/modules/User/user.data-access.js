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

  const getUsers = async (params) => {
    const { page, limit } = params;

    const users = await UserModel.aggregate([
      {
        $facet: {
          data: [
            { $match: {} },
            {
              $project: {
                password: 0
              }
            },
            { $skip: page * limit },
            { $limit: limit }
          ],
          total: [{ $count: 'total' }]
        }
      }
    ]);

    return users;
  };

  const findUserByParams = async (params = {}) => {
    const user = await UserModel.findOne({
      ...params,
      deleted: { $ne: true }
    })
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
          ...params
        }
      },
      { new: true }
    );
    const savedUser = await user.save();
    return savedUser;
  };

  const deleteUser = async (_id) => {
    await UserModel.findOneAndUpdate(
      { _id },
      {
        $set: {
          deleted: true,
          deletedAt: new Date().valueOf()
        }
      },
      { new: true }
    );
    return true;
  };

  const deleteUserPermanently = async (_id, params = {}) => {
    const user = await UserModel.findOneAndDelete({ _id }, params);
    return user;
  };

  return Object.freeze({
    createUser,
    getUsers,
    findUserByParams,
    findUserAndUpdate,
    deleteUser,
    deleteUserPermanently
  });
};

module.exports = UserDataAccess;
