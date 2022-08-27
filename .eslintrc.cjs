module.exports = {
  extends: ["100terres"],
  ignorePatterns: ["coverage/", "dist/", "node_modules/"],

  overrides: [
    {
      files: ["!src/**/*"],
      rules: {
        "import/no-extraneous-dependencies": "off",
      },
    },
  ],
};
