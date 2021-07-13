/**
  @param - database instance (e.g User Model)
*/

const AuthDataAccess = ({ UserModel }) => {
  const login = async ({ _id, password }) => {
    const user = await UserModel.findOne({ _id });

    if (!user) {
      return false;
    }

    const isPassword = await user.comparePassword(password);
    return isPassword;
  };

  const updatePassword = async ({ _id, newPassword }) => {
    const newUserPwd = await UserModel.findOneAndUpdate(
      { _id },
      {
        $set: {
          password: newPassword,
          is_password_changed: true
        }
      },
      { new: true }
    );
    const updatedUser = await newUserPwd.save();
    return updatedUser;
  };

  const resetTokens = async ({ _id, pwdResetToken, resetPasswordExpires }) => {
    const newUserPwd = await UserModel.findOneAndUpdate(
      { _id },
      {
        $set: {
          resetPasswordToken: pwdResetToken,
          resetPasswordExpires // 1 hour
        }
      },
      { new: true }
    );
    const updatedUser = await newUserPwd.save();
    return updatedUser;
  };

  const findUserByPasswordExpireTime = async ({
    token,
    resetPasswordExpires = Date.now()
  }) => {
    const user = await UserModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: resetPasswordExpires }
    });
    return user;
  };

  const resetPassword = async ({ _id, password }) => {
    const newUserPwd = await UserModel.findOneAndUpdate(
      { _id },
      {
        $set: {
          password,
          resetPasswordToken: undefined,
          resetPasswordExpires: undefined
        }
      },
      { new: true }
    );
    const updatedUser = await newUserPwd.save();
    return updatedUser;
  };

  return {
    login,
    updatePassword,
    resetTokens,
    findUserByPasswordExpireTime,
    resetPassword
  };
};

module.exports = AuthDataAccess;
