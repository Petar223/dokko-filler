const alias = require('./aliases');

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    react: { version: 'detect' },
    'import/resolver': {
      alias: {
        map: Object.entries(alias),
        extensions: ['.js', '.jsx', '.json'],
      },
    },
  },
  plugins: ['react', 'jsx-a11y', 'prettier', 'import'],
  rules: {
    // Formatting rules live in .prettierrc.
    'prettier/prettier': 'warn',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-unused-vars': [
      'warn',
      { vars: 'all', args: 'after-used', ignoreRestSiblings: true },
    ],
    'import/no-unresolved': ['error', { ignore: ['\\.svg$'] }],
    'import/order': [
      'warn',
      {
        groups: [
          ['builtin', 'external'],
          'internal',
          ['parent', 'sibling', 'index'],
        ],
        pathGroups: [{ pattern: '~*/**', group: 'internal' }],
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.test.js', '**/*.test.jsx', 'jest.setup.js'],
      env: { jest: true },
    },
  ],
};
