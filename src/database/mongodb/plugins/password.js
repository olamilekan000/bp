/* eslint-disable no-param-reassign */
const bcrypt = require('bcrypt');

const SALT_SCH = 10;

const hashPasswordPlugin = (schema) => {
  schema.pre('save', function (next) {
    if (!this.isModified('password')) return next();
    return bcrypt.genSalt(SALT_SCH, (err, salt) => {
      if (err) return next(err);
      return bcrypt.hash(this.password, salt, (errHash, hash) => {
        if (errHash) return next(errHash);
        this.password = hash;
        return next();
      });
    });
  });
};

const changePasswordPlugin = (schema) => {
  schema.pre('findOneAndUpdate', function (next) {
    const { password } = this.getUpdate().$set;
    if (!password) {
      return next();
    }

    return bcrypt.genSalt(SALT_SCH, (err, salt) => {
      if (err) return next(err);
      return bcrypt.hash(password, salt, (err2, hash) => {
        if (err2) return next(err2);
        this.getUpdate().$set.password = hash;
        return next();
      });
    });
  });
};

const comparePasswordPlugin = (schema) => {
  schema.methods.comparePassword = async function (pwd) {
    const response = await bcrypt.compare(pwd, this.password);
    return response;
  };
};

module.exports = {
  hashPasswordPlugin,
  changePasswordPlugin,
  comparePasswordPlugin
};
