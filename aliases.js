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
  // legacy (removed after the feature-folder move)
  '~components': 'src/components',
  '~shared-components': 'src/shared-components',
  '~pages': 'src/pages',
  '~context': 'src/context',
  '~utils': 'src/utils',
};

module.exports = Object.fromEntries(
  Object.entries(dirs).map(([alias, dir]) => [alias, path.resolve(__dirname, dir)])
);
