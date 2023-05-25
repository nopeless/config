module.exports = {
  root: true,
  parser: `@typescript-eslint/parser`,
  plugins: [`@typescript-eslint`, `prettier`],
  extends: [
    `eslint:recommended`,
    `plugin:@typescript-eslint/eslint-recommended`,
    `plugin:@typescript-eslint/recommended`,
  ],
  env: {
    es6: true,
    node: true,
  },
  ignorePatterns: [`dist`, `-*`],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: `module`,
  },
  rules: {
    "prettier/prettier": [
      `warn`,
      {
        // prettier options
      },
    ],
    "no-console": `off`,
    "func-names": `off`,
    "no-underscore-dangle": `off`,
    "jest/expect-expect": `off`,
    "security/detect-object-injection": `off`,

    "array-callback-return": [
      `error`,
      {
        allowImplicit: true,
        checkForEach: true,
      },
    ],
    "no-duplicate-imports": `off`,
    "@typescript-eslint/no-duplicate-imports": `error`,

    "no-promise-executor-return": `error`,
    "require-atomic-updates": `error`,
    camelcase: [
      `warn`,
      {
        properties: `never`,
        ignoreDestructuring: true,
        ignoreImports: true,
        ignoreGlobals: false,
        allow: [
          `^__`,
          // Allow things like
          // SomeClass__someProperty
          `(?:[A-Z]?[a-z]*)+__(?:[A-Z]?[a-z]*)+`,
        ],
      },
    ],
    complexity: `warn`,

    "prefer-const": [
      `warn`,
      {
        destructuring: `all`,
      },
    ],

    "spaced-comment": [`error`, `always`, { markers: [`/`] }],

    "linebreak-style": [`error`, `unix`],
    semi: [`error`, `always`],
    quotes: `off`,
    indent: [`off`],
    "quote-props": [`error`, `as-needed`],
    strict: 0,
    "comma-dangle": [
      `error`,
      {
        arrays: `always-multiline`,
        objects: `always-multiline`,
        imports: `always-multiline`,
        exports: `always-multiline`,
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      `warn`,
      {
        argsIgnorePattern: `^_`,
        varsIgnorePattern: `^_`,
        caughtErrorsIgnorePattern: `^_`,
      },
    ],

    "@typescript-eslint/no-explicit-any": `off`,
    "@typescript-eslint/ban-ts-comment": `off`,
    "@typescript-eslint/ban-types": [
      `warn`,
      {
        types: {
          "{}": false,
        },
      },
    ],
    "@typescript-eslint/quotes": [`error`, `backtick`],

    "no-trailing-spaces": `error`,
    "space-infix-ops": [`error`, { int32Hint: false }],
    "eol-last": [`error`, `always`],
    "comma-style": [
      `error`,
      `last`,
      {
        exceptions: {
          ImportDeclaration: true,
        },
      },
    ],
  },
};
