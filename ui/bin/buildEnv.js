const fs = require('fs');
const _ = require('lodash');

const envVariables = require('../config/.env');

const createEnvfile = (directory, variables) => {
  _.each(variables, variable => {
    fs.appendFileSync(`./${directory}/.env`, variable + '\n');
  });
};

const buildEnv = () => {
  _.each(envVariables, (value, key) => {
    fs.writeFileSync(`./${key}/.env`, '');
    createEnvfile(key, value);
  });
};

buildEnv();
