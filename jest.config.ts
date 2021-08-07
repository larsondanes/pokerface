import type { InitialOptionsTsJest } from "ts-jest/dist/types";

const config: InitialOptionsTsJest = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  reporters: [
    "default",
  ]
};

export default config;