module.exports = (api) => {
  const isDev = api.env('development');
  const isTest = api.env('test');

  return {
    presets: [
      ['@babel/preset-env', isTest ? { targets: { node: 'current' } } : {}],
      ['@babel/preset-react', { runtime: 'automatic' }],
    ],
    sourceType: 'unambiguous',
    plugins: [
      '@babel/plugin-transform-runtime',
      'babel-plugin-styled-components',
      isDev && 'react-refresh/babel',
    ].filter(Boolean),
  };
};
