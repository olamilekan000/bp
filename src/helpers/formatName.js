const { capitalize } = require('./capitalize');

const containerNameFormatter = (group) => (contName) => {
  const sanitizedString = contName.replace(
    new RegExp('(?:\\b|_)([a-z])', 'g'),
    ($1) => $1.toUpperCase()
  );

  const cleanContName = sanitizedString.replace(new RegExp('[-]', 'g'), '');

  const name = `${capitalize(cleanContName.split('.')[0])}${capitalize(group)}`;

  return name;
};

module.exports = {
  containerNameFormatter
};
