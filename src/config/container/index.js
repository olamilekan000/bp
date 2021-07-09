const awilix = require('awilix');

const { containerNameFormatter } = require('../../helpers/formatName');

const container = awilix.createContainer();

const setupContainer = () => {
  container.loadModules(['../../modules/**/**.services.js'], {
    cwd: __dirname,
    resolverOptions: {
      register: awilix.asClass,
    },
    formatName: containerNameFormatter('Service'),
  });

  container.loadModules(['../../modules/**/**.controllers.js'], {
    cwd: __dirname,
    resolverOptions: {
      register: awilix.asClass,
    },
    formatName: containerNameFormatter('Controller'),
  });

  container.loadModules(['../../modules/**/**.data-access.js'], {
    cwd: __dirname,
    resolverOptions: {
      register: awilix.asFunction,
    },
    formatName: containerNameFormatter('DataAccess'),
  });

  container.loadModules(['../../database/models/**/*.js'], {
    cwd: __dirname,
    resolverOptions: {
      register: awilix.asValue,
    },
    formatName: containerNameFormatter('Model'),
  });
};

module.exports = {
  container,
  setupContainer,
};
