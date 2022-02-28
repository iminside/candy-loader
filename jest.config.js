module.exports = {
    testEnvironment: 'node',
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'js', 'json'],
    coverageDirectory: 'coverage',
    collectCoverageFrom: ['src/**/*.ts'],
}
