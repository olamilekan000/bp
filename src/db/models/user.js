const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  _id: String,
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
});

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;
