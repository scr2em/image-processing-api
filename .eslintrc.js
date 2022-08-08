module.exports = {
  env: {
    browser: true,
    es2021: true,
    jasmine: true,
  },
  extends: ["airbnb-base"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    quotes: 0,
    "no-console": 0,
    "consistent-return": 0,
    "import/prefer-default-export": 0,
    "import/extensions": 0,
    "max-len": 0,
    "comma-dangle": 0,
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
};
