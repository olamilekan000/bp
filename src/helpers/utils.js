const crypto = require('crypto');
const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

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

module.exports = {
  capitalize,
  generateCryptoToken
};
