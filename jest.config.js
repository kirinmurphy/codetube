// module.exports = {
//   preset: 'ts-jest',
//   // moduleNameMapper: {
//   //   '^@/(.*)$': '<rootDir>/$1',
//   // },

//   testEnvironment: 'jest-environment-jsdom',
//   transform: {
//     '^.+\\.tsx?$': 'ts-jest',
//   },
//   moduleNameMapper: {
//     '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
//   },
//   setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
// };


module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest', // Add this if you need to support .jsx files
  },
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
