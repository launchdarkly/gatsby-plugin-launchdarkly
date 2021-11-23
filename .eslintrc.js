module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        jest: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
    ],
    globals: {
        Atomics: 'readonly',
        'jest/globals': true,
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    plugins: [
        'import',
        'jest',
        'react',
        'react-hooks',
    ],
    rules: {
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'no-duplicate-imports': 'error',
        'quote-props': ['error', 'as-needed', {unnecessary:true}],

        // Forbid unnecessary backticks
        // https://github.com/prettier/eslint-config-prettier/blob/master/README.md#forbid-unnecessary-backticks
        quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: false }],
    },
    settings: {
        react: {
            version: 'latest'
        }
    }
};