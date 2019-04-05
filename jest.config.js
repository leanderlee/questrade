/** @format */
const { defaults: jestPreset } = require('ts-jest/presets');

// import { jestPreset } from 'ts-jest';

// export default {
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageDirectory: './build/coverage',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  rootDir: '.',
  // The glob patterns Jest uses to detect test files
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],

  // A list of paths to directories that Jest should use to search for files in
  verbose: true,
  testPathIgnorePatterns: ['<rootDir>/build/', '<rootDir>/build/'],
  transform: {
    ...jestPreset.transform,
  },
  globals: {
    'ts-jest': {
      diagnostics: {
        warnOnly: true,
      },
    },
  },

  notify: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts'],
  // <rootDir>/build/
  coveragePathIgnorePatterns: [
    '<rootDir>/build/',
    '<rootDir>/build/',
    '<rootDir>/src/__tests__/smoketest',
  ],
  coverageReporters: ['text', 'lcov', 'html', 'json'],
};
