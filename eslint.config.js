const browserGlobals = [
  'window',
  'document',
  'navigator',
  'URL',
  'Intl',
  'ImageData',
  'jsQR',
  'createImageBitmap',
  'setTimeout',
  'clearTimeout',
  'setInterval',
  'clearInterval',
  'console',
];

export default [
  {
    files: ['src/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'script',
      globals: Object.fromEntries(
        browserGlobals.map((name) => [name, 'readonly']),
      ),
    },
    rules: {
      'no-undef': 'error',
      'no-unused-vars': ['error', { args: 'none', caughtErrors: 'none' }],
      'no-unreachable': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      eqeqeq: ['error', 'always'],
    },
  },
];
