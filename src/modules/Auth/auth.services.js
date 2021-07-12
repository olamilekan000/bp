const { createToken } = require('../../config/jwt');
const generateCryptoToken = require('../../helpers/crypto-gen');
const makeHttpSuccess = require('../../helpers/http-success');
const makeHttpError = require('../../helpers/http-error');

class AuthService {
  constructor({ UserDataAccess, AuthDataAccess }) {
    this.UserDataAccess = UserDataAccess;
    this.AuthDataAccess = AuthDataAccess;
  }

  async createUser(httpRequest) {
    const { body } = httpRequest;

    const { UserDataAccess } = this;

    const user = await UserDataAccess.createUser(body);

    return makeHttpSuccess({
      statusCode: 201,
      successMessage: 'ok',
      successData: user
    });
  }

  async login(httpRequest) {
    const {
      body: { email, password }
    } = httpRequest;

    const { UserDataAccess, AuthDataAccess } = this;

    const user = await UserDataAccess.findUserByParams({
      email
    });

    if (!user) {
      return makeHttpError({
        statusCode: 404,
        errorMessage: 'A user with this email does not exist'
      });
    }

    const isPassword = await AuthDataAccess.login({
      password,
      _id: user._id
    });

    if (!isPassword) {
      return makeHttpError({
        statusCode: 401,
        errorMessage: 'You have entered a wrong user credentials.'
      });
    }

    const token = createToken(user);

    return makeHttpSuccess({
      statusCode: 200,
      successMessage: 'ok',
      successData: {
        ...user,
        token
      }
    });
  }

  async changePassword(httpRequest) {
    const { body, sub } = httpRequest;

    const { UserDataAccess, AuthDataAccess } = this;

    const existingUser = await UserDataAccess.findUserByParams({
      _id: sub._id
    });

    if (!existingUser) {
      return makeHttpError({
        statusCode: 404,
        errorMessage: 'A user with this email does not exist'
      });
    }

    const isPassword = await AuthDataAccess.loginService({
      password: body.currentPassword,
      _id: sub._id
    });

    if (!isPassword) {
      return makeHttpError({
        statusCode: 401,
        errorMessage: 'You have entered a wrong user credentials.'
      });
    }

    const updatedUser = await AuthDataAccess.updatePassword({
      _id: sub._id,
      newPassword: body.newPassword
    });

    return makeHttpSuccess({
      statusCode: 200,
      successMessage: 'Password was succefully changed',
      successData: {
        first_name: updatedUser.first_name,
        last_name: updatedUser.last_name,
        middle_name: updatedUser.middle_name,
        user_type: updatedUser.user_type,
        email: updatedUser.email,
        is_password_changed: updatedUser.updatedUser
      }
    });
  }

  async forgotPassword(httpRequest) {
    const {
      body: { email }
    } = httpRequest;

    const { UserDataAccess, AuthDataAccess } = this;

    const user = await UserDataAccess.findUserByParams({
      email
    });

    if (!user) {
      return makeHttpError({
        statusCode: 400,
        errorMessage: ''
      });
    }

    const token = await generateCryptoToken();
    await AuthDataAccess.resetTokens({
      _id: user._id,
      pwdResetToken: token,
      resetPasswordExpires: Date.now() + 3600000 // 1 hour,
    });

    // await this.mailer({
    //   to: user.email,
    //   subject: "Reset Password",
    //   html: forgotPasswordTemplate({
    //     first_name: user.first_name,
    //     last_name: user.last_name,
    //     link: `http://localhost:9093/api/v1/auth/reset-password/${token}`,
    //   }),
    // });

    return makeHttpSuccess({
      statusCode: 200,
      successMessage: 'An email has been sent to your account.',
      successData: {}
    });
  }

  async resetPassword(httpRequest) {
    const {
      params: { token },
      body: { id, password }
    } = httpRequest;

    const { AuthDataAccess } = this;

    const user = await AuthDataAccess.findUserByPasswordExpireTime({
      token
    });

    if (!user) {
      return makeHttpError({
        statusCode: 401,
        errorMessage: 'Invalid token'
      });
    }

    const updatedUser = await AuthDataAccess.resetPassword({
      _id: id,
      password
    });

    // await this.mailer({
    //   to: updatedUser.email,
    //   subject: "Reset Password Success",
    //   html: resetPasswordSuccess({
    //     first_name: updatedUser.first_name,
    //     email: updatedUser.email,
    //   }),
    // });

    return makeHttpSuccess({
      statusCode: 200,
      successMessage: 'Your password has been successfully changed',
      successData: updatedUser
    });
  }
}

module.exports = AuthService;
