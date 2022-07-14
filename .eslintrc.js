module.exports = {
  parser: "@typescript-eslint/parser",
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "airbnb-base",
    "prettier",
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    "no-unused-expressions": ["error", { allowTernary: true }],
    "no-param-reassign": ["error", { props: false }],
    "arrow-body-style": "off",
    "no-else-return": "off",
    "import/prefer-default-export": "off",
    "import/extensions": "off",
  },
};
