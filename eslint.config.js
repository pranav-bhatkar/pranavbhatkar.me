const {
    defineConfig,
    globalIgnores,
} = require("eslint/config");

const tsParser = require("@typescript-eslint/parser");
const globals = require("globals");
const typescriptEslint = require("@typescript-eslint/eslint-plugin");
const js = require("@eslint/js");

const {
    FlatCompat,
} = require("@eslint/eslintrc");

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

module.exports = defineConfig([{
    languageOptions: {
        parser: tsParser,

        globals: {
            ...globals.browser,
            ...globals.amd,
            ...globals.node,
        },

        parserOptions: {
            project: true,
            tsconfigRootDir: __dirname,
        },
    },

    plugins: {
        "@typescript-eslint": typescriptEslint,
    },

    extends: compat.extends(
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:jsx-a11y/recommended",
        "plugin:prettier/recommended",
        "next",
        "next/core-web-vitals",
    ),

    rules: {
        "prettier/prettier": "warn",
        "react/react-in-jsx-scope": "off",

        "jsx-a11y/anchor-is-valid": ["warn", {
            components: ["Link"],
            specialLink: ["hrefLeft", "hrefRight"],
            aspects: ["invalidHref", "preferButton"],
        }],

        "react/prop-types": 0,
        "@typescript-eslint/no-unused-vars": 0,
        "react/no-unescaped-entities": 0,
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/ban-ts-comment": "off",
    },
}, globalIgnores(["**/node_modules", "**/.eslintrc.js"])]);
