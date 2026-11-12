// Single source of truth for import aliases (webpack, Jest, ESLint).
const path = require('path');

const dirs = {
  '~components': 'src/components',
  '~shared-components': 'src/shared-components',
  '~pages': 'src/pages',
  '~hooks': 'src/hooks',
  '~api': 'src/api',
  '~context': 'src/context',
  '~utils': 'src/utils',
};

module.exports = Object.fromEntries(
  Object.entries(dirs).map(([alias, dir]) => [
    alias,
    path.resolve(__dirname, dir),
  ])
);
