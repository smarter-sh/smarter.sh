/**
 * Set the version in package.json.
 *
 * Used by .github/workflows/semanticVersionBump.yml:
 *   node updateVersion.js 1.2.3
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const version = process.argv[2]
if (!version) {
  console.error('Version argument required')
  process.exit(1)
}

const packagePath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  'package.json'
)
const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'))
pkg.version = version
fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2) + '\n')
console.log(`Updated package.json version to ${version}`)
