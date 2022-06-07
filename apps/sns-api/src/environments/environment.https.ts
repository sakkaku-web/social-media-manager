import { readFileSync } from 'fs';

// Needs https version for development because Facebook...
//
// They save localhost is always allowed as redirect so they don't let us save it
// But it is not allowed to login will not work.
export const environment = {
  production: false,
  homepage: '/',
  staticFiles: '../../apps/sns-manager',
  baseUrl: 'https://localhost:3333/api',
  https: {
    key: readFileSync(`${__dirname}/assets/server.key`, 'utf8'),
    cert: readFileSync(`${__dirname}/assets/server.cert`, 'utf8'),
  },
};
