module.exports = () => {
  const tslintConfig = {
    extends: [
      'tslint:latest'
    ],
    rules: {
      "adjacent-overload-signatures": true,
      "member-access": true,
      "ban-comma-operator": true,
      "function-constructor": true,
      "label-position": true,
      "no-arg": true,
      "no-conditional-assignment": true,
      "no-construct": true,
      "no-duplicate-switch-case": true,
      "no-any": true,
      "curly": true,
      "no-sparse-arrays": true,
      "no-var-keyword": true,
      "prefer-const": true,
      "array-type": [true, "array"],
      "one-variable-per-declaration": true,
      "variable-name": [
        true,
        "ban-keywords",
        "check-format",
        "require-const-for-all-caps",
        "allow-leading-underscore",
      ]
    },
  };
  return tslintConfig;
}