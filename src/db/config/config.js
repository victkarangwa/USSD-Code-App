const config = {
  development: {
    use_env_variable: 'DATABASE_DEV_URL',
    dialect: 'postgresql',
    logging: false,
  },

  testing: {
    use_env_variable: 'DATABASE_TEST_URL',
    dialect: 'postgresql',
    logging: false,
  },

  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgresql',
    logging: false,
  },
};

module.exports = config;
