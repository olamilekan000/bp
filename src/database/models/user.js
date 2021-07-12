const mongoose = require('mongoose');
const softDeletePlugin = require('../mongodb/plugins/soft-delete');
const {
  hashPasswordPlugin,
  changePasswordPlugin,
  comparePasswordPlugin
} = require('../mongodb/plugins/password');

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    _id: String,
    firstName: String,
    lastName: String,
    email: {
      type: String,
      unique: true
    },
    permissions: [String],
    isPasswordChanged: Boolean,
    deletedAt: { type: Date, default: null },
    deleted: Boolean,
    type: String,
    password: String,
    userType: String
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    },
    versionKey: false
  }
);

softDeletePlugin(UserSchema);
hashPasswordPlugin(UserSchema);
changePasswordPlugin(UserSchema);
comparePasswordPlugin(UserSchema);

const UserModel = mongoose.model('Users', UserSchema);

module.exports = UserModel;
