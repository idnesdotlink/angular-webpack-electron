module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true
  },
  extends: [
    'standard',
  ],
  globals: {
  },
  plugins: [
    'promise'
  ],
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    'semi': 0,
    'camelcase': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}