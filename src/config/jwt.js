const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./environment')();

const createToken = ({ firstName, lastName, _id, userType }) =>
  jwt.sign(
    {
      firstName,
      lastName,
      _id,
      userType
    },
    jwtSecret,
    { expiresIn: '1h' }
  );

const verifyJwtToken = (token, secret) =>
  new Promise((resolve, reject) =>
    jwt.verify(token, secret, (err, decoded) => {
      // err
      if (err) return reject(err);
      resolve(decoded);
    })
  );

module.exports = {
  createToken,
  verifyJwtToken
};
