const bcrypt = require('bcrypt');

const SALT_SCH = 10;

const hashPasswordPlugin = (schema) => {
  schema.pre('save', function (next) {
    if (!this.isModified('password')) return next();
    bcrypt.genSalt(SALT_SCH, (err, salt) => {
      if (err) return next(err);
      bcrypt.hash(this.password, salt, (err, hash) => {
        if (err) return next(err);
        this.password = hash;
        next();
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

    bcrypt.genSalt(SALT_SCH, (err, salt) => {
      if (err) return next(err);
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) return next(err);
        this.getUpdate().$set.password = hash;
        next();
      });
    });
  });
};

const comparePasswordPlugin = (schema) => {
  schema.methods.comparePassword = async function (pwd) {
    return await bcrypt.compare(pwd, this.password);
  };
};

module.exports = {
  hashPasswordPlugin,
  changePasswordPlugin,
  comparePasswordPlugin,
};
