module.exports = {
    parser: 'babel-eslint',
    extends: ['plugin:compat/recommended'],
    env: {
        browser: true,
        node: true,
        es6: true,
        mocha: true,
        jest: true,
        jasmine: true,
    },
    rules: {
        "quotes": [2, "single"], //单引号
    }
};
