import * as dotenv from 'dotenv';

dotenv.config();

module.exports = (on, config) => {
  const keys = [
    'TWITTER_TEST_USER',
    'TWITTER_TEST_PW',
    'PINTEREST_TEST_USER',
    'PINTEREST_TEST_PW',
  ];

  keys.forEach((key) => {
    config.env[key] = process.env[key];
  });

  return config;
};
