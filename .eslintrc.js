module.exports = {
  extends: 'airbnb-base',
  rules: {
    // I want to use console statements for debugging
    'no-console': ['off'],

    // I want to use functions before they are defined because it makes the code cleaner
    'no-use-before-define': ['error', { functions: false, classes: false }],

    // this interferes with prettier and prettier can't be configured to always use parens
    'arrow-parens': ['error', 'as-needed'],
  },
};
