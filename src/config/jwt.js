const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./environment')();

const createToken = ({
  first_name, last_name, _id, user_type,
}) => jwt.sign(
  {
    first_name, last_name, _id, user_type,
  },
  jwtSecret,
  { expiresIn: '1h' },
);

const verifyJwtToken = (token, secret) => new Promise((resolve, reject) => {
  jwt.verify(token, secret, (err, decoded) => {
    // err
    if (err) return reject(err);
    resolve(decoded);
  });
});

module.exports = {
  createToken,
  verifyJwtToken,
};
