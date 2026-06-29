module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: false,
        tsconfig: {
          esModuleInterop: true,
          skipLibCheck: true,
          resolveJsonModule: true,
          forceConsistentCasingInFileNames: true,
          strict: true,
          moduleResolution: "node",
          target: "ES2020",
          lib: ["ES2020"],
        },
      },
    ],
  },
  testMatch: ["**/*.test.ts"],
  verbose: true,
};
