const { capitalize } = require('./capitalize');

const containerNameFormatter = (group) => (contName, descriptor) => {
  const name = `${capitalize(contName.split('.')[0])}${capitalize(group)}`;
  // console.log('name', name, 'descriptor=-=-=', descriptor, '=-=-=-')
  return name;
};

module.exports = {
  containerNameFormatter,
};
