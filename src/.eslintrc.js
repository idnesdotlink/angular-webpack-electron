module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'angular'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:angular/johnpapa'
  ],
  rules:
  {
    // Overwrite rules specified from the extended configs e.g.
    // "@typescript-eslint/explicit-function-return-type": "off",
    "indent": "off",
    "@typescript-eslint/indent": ["error", 2],
    "@typescript-eslint/explicit-member-accessibility": "off"
  }
}