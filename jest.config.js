module.exports = {
    preset: '@vue/cli-plugin-unit-jest',
    "//": "Override default, which looks in '/tests/unit/'",
    testMatch: [
        '**/tests/**/*.spec.[jt]s?(x)',
        '**/__tests__/*.[jt]s?(x)'
    ],
    setupFiles: ["<rootDir>/src/tests/setup.js"],
    transformIgnorePatterns: ['node_modules/(?!vue-router|@babel|vuetify)']
}
