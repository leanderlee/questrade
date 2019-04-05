/** @format */

import { jestPreset } from 'ts-jest';
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx'],
  rootDir: '../../../',

  // The glob patterns Jest uses to detect test files
  testMatch: ['**/?(*.)+(smoke.detection).[tj]s?(x)'],
  verbose: true,
  testPathIgnorePatterns: ['\\\\node_modules\\\\', '\\\\build\\\\'],
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
