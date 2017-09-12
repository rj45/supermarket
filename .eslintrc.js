module.exports = {
  extends: 'airbnb-base',
  globals: {
    describe: true,
    beforeEach: true,
    it: true,
  },
  rules: {
    // I want to use console statements for debugging
    'no-console': ['off'],

    // I want to use functions before they are defined because it makes the code cleaner
    'no-use-before-define': ['error', { functions: false, classes: false }],

    // this interferes with prettier and prettier can't be configured to always use parens
    'arrow-parens': ['error', 'as-needed'],

    // I use this to denote private members
    'no-underscore-dangle': ['off'],

    // dangling commas on functions fail to parse on node 6 (works on node 8 though)
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
      },
    ],
  },
};
