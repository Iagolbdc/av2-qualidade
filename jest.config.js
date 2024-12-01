export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: [                  
        '**/test/**/*.test.js',
    ],
    roots: ['<rootDir>/src/test'], 
    collectCoverage: true,        
    coverageDirectory: 'coverage',
    transform: {'^.+\\.js$': 'babel-jest',}
}
