const fs = require('fs');
const path = require('path');

const filesToCopy = ['package.json'];

const currentDir = process.cwd();

filesToCopy.map(file => {
  return fs.copyFileSync(file, path.resolve(currentDir, `build/${file}`));
});
