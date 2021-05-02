module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb-base", "prettier"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    "no-unused-expressions": ["error", { allowTernary: true }],
    "no-param-reassign": ["error", { props: false }],
  },
};
