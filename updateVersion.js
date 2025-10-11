const fs = require('fs');
const path = require('path');

const version = process.argv[2];
if (!version) {
  console.error('Version argument required');
  process.exit(1);
}

const packagePath = path.join(__dirname, '../../package.json');
const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
pkg.version = version;
fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2) + '\n');
console.log(`Updated package.json version to ${version}`);
