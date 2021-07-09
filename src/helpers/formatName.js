const {capitalize} = require('./capitalize');

const containerNameFormatter = (group) => (contName, descriptor) => {
  const name = `${capitalize(contName.split('.')[0])}${capitalize(group)}`;
  return name;
};

module.exports = {
  containerNameFormatter
};
