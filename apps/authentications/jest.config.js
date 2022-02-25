module.exports = {
  rootDir: '../',
  testMatch: ['<rootDir>/src/**/__tests__/**/*.(spec|test).{js,jsx,ts,tsx}'],
  displayName: 'authentications',
  preset: '../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/authentications',
};
