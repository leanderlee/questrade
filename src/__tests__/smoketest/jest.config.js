/** @format */

const { defaults: jestPreset } = require('ts-jest/presets');

// import { jestPreset } from 'ts-jest';
// export default {
module.exports = {
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx'],
  preset: 'ts-jest',
  rootDir: '../../../',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['\\\\node_modules\\\\', '\\\\build\\\\'],

  // The glob patterns Jest uses to detect test files
  testMatch: ['**/?(*.)+(smoke.detection).[tj]s?(x)'],
  verbose: true,
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
  coverageReporters: ['text-summary'],
  collectCoverageFrom: ['../../../src/**/*.ts'],
  coverageDirectory: '../../../coverage/smoketest/',
};
// [jest-config].globals.ts-jest.diagnostics
