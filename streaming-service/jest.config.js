module.exports = {
    // globals: {
    //     "ts-jest": {
    //         tsconfig: "tsconfig.json",
    //     },
    // },
    moduleFileExtensions: ["ts", "js"],
    transform: {
        "^.+\\.(ts|tsx)$": ["ts-jest", { tsconfig: "tsconfig.json" }],
    },
    testMatch: ["**/test/**/*.test.ts"],
    testEnvironment: "node",
};
