/**
  @param - database instance (e.g User Model)
*/

const AuthDataAccess = ({UserModel}) => {
  const login = async ({_id, password}) => {
    const user = await UserModel.findOne({_id});

    if (!user) {
      return false;
    }

    const isPassword = await user.comparePassword(password);
    return isPassword;
  };

  const updatePassword = async ({_id, newPassword}) => {
    const newUserPwd = await userModel.findOneAndUpdate(
      {_id},
      {
        $set: {
          password: newPassword,
          is_password_changed: true
        }
      },
      {new: true}
    );
    return await newUserPwd.save();
  };

  const resetTokens = async ({_id, pwdResetToken, resetPasswordExpires}) => {
    const newUserPwd = await userModel.findOneAndUpdate(
      {_id},
      {
        $set: {
          resetPasswordToken: pwdResetToken,
          resetPasswordExpires // 1 hour
        }
      },
      {new: true}
    );
    return await newUserPwd.save();
  };

  const findUserByPasswordExpireTime = async ({
    token,
    resetPasswordExpires = Date.now()
  }) => {
    const user = await userModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: {$gt: resetPasswordExpires}
    });
    return user;
  };

  const resetPassword = async ({_id, password}) => {
    const newUserPwd = await userModel.findOneAndUpdate(
      {_id},
      {
        $set: {
          password,
          resetPasswordToken: undefined,
          resetPasswordExpires: undefined
        }
      },
      {new: true}
    );
    return await newUserPwd.save();
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
