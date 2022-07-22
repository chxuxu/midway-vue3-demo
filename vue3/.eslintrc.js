module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'quotes':'off',
    'semi':'off',
    'indent':'off',
    'padded-blocks':'off',
    'prefer-const':'off',
    'space-infix-ops':'off',
    'eol-last':'off',
    'object-curly-spacing':'off',
    'keyword-spacing':'off',
    'eqeqeq':'off',
    'arrow-spacing':'off',
    'key-spacing':'off',
    'comma-dangle':'off',
    'lines-between-class-members':'off',
    'no-trailing-spaces':'off',
    'no-multiple-empty-lines':'off',
    'no-extra-semi':'off',
    'no-extra-parens':'off',
    'no-irregular-whitespace':'off',
    'space-before-function-paren':'off',
    'space-before-blocks':'off',
    'comma-spacing':'off',
    'Trailing spaces not allowed':'off',
    'spaced-comment':'off',
    '@typescript-eslint/no-empty-function':'off',
    '@typescript-eslint/explicit-module-boundary-types':'off',
    '@typescript-eslint/no-unused-vars':'off'
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
