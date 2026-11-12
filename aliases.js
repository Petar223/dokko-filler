// Single source of truth for import aliases (webpack, Jest, ESLint).
const path = require('path');

const dirs = {
  '~app': 'src/app',
  '~api': 'src/api',
  '~features': 'src/features',
  '~ui': 'src/ui',
  '~theme': 'src/theme',
  '~hooks': 'src/hooks',
  '~lib': 'src/lib',
  '~constants': 'src/constants',
};

module.exports = Object.fromEntries(
  Object.entries(dirs).map(([alias, dir]) => [alias, path.resolve(__dirname, dir)])
);
