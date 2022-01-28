module.exports = {
  '.editorconfig': ['prettier --write'],
  '**/*.json': ['prettier --write'],
  '**/*.{js,ts}': [
    'prettier --write',
    'eslint --cache --format=pretty --max-warnings=0 --fix',
    // 'jest --bail --findRelatedTests',
  ],
};
