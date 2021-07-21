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

const filterEmptyObjects = (obj) => {
  const allObjectValues = Object.keys(obj);

  const newObject = allObjectValues.reduce((acc, currObjKey) => {
    if (obj[currObjKey]) {
      return {
        ...acc,
        [currObjKey]: obj[currObjKey]
      };
    }
    return acc;
  }, {});

  return newObject;
};

module.exports = {
  containerNameFormatter,
  filterEmptyObjects
};
