module.exports = {
  root: true,
  parser: `@typescript-eslint/parser`,
  plugins: [`@typescript-eslint`, `prettier`],
  extends: [
    `eslint:recommended`,
    `plugin:eslint-comments/recommended`,
    `plugin:@typescript-eslint/eslint-recommended`,
    `plugin:@typescript-eslint/recommended`,
  ],
  env: {
    es6: true,
    node: true,
  },
  ignorePatterns: [`node_modules`, `dist`, `-*`],
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
    "import/no-duplicates": `warn`,

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
          `^(?:[A-Z]?[a-z]*)+__(?:[A-Z]?[a-z]*)+$`,
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
    "no-empty-function": `off`,
    "@typescript-eslint/no-empty-function": `off`,
    "@typescript-eslint/no-empty-interface": `warn`,

    "linebreak-style": [`error`, `unix`],
    semi: [`error`, `always`],
    quotes: `off`,
    indent: `off`,
    "quote-props": [`error`, `as-needed`],
    strict: `error`,
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

    "operator-assignment": [`warn`],
    eqeqeq: [
      `error`,
      `always`,
      {
        null: `ignore`,
      },
    ],
    "dot-notation": `warn`,
    "func-style": [
      `warn`,
      `declaration`,
      {
        allowArrowFunctions: true,
      },
    ],
    "logical-assignment-operators": [
      `warn`,
      `always`,
      {
        enforceForIfStatements: true,
      },
    ],
    "no-array-constructor": `error`,
    "no-else-return": `warn`,
    "no-useless-return": `warn`,
    "prefer-arrow-callback": `off`,
    "prefer-exponentiation-operator": `error`,
    radix: `error`,
    yoda: [`warn`, `never`, { onlyEquality: true }],
    "no-cond-assign": `off`,

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
    "@typescript-eslint/no-non-null-assertion": `off`,

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

    "eslint-comments/no-aggregating-enable": `off`,
    "eslint-comments/no-unused-disable": `error`,
    "eslint-comments/disable-enable-pair": [`error`, { allowWholeFile: true }],
  },
};
