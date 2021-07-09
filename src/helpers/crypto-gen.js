const crypto = require('crypto');

const generateCryptoToken = () =>
  new Promise((resolve, reject) => {
    crypto.randomBytes(20, (err, buf) => {
      const token = buf.toString('hex');
      resolve(token);
      if (err) {
        reject(err);
      }
    });
  });

module.exports = generateCryptoToken;
