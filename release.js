/*---------------------------------------------------------
 * usage:      deploy production build of smarter.sh ReactJ
 *             app to AWS S3 bucket.
 *
 *             https://gist.github.com/kellyrmilligan/e242d3dc743105fe91a83cc933ee1314
 *
 *             1. Build the React application
 *             2. Upload to AWS S3
 *             3. Invalidate all items in the AWS Cloudfront CDN.
 *
 *             The environment is the RELEASE_BRANCH environment
 *             variable (alpha, beta or main), or else the current
 *             git branch. --skip-build deploys the existing dist/,
 *             e.g. the one built by .github/workflows/build.yml.
 *
 * Note: requires node v24 or later.
 *---------------------------------------------------------*/

import { execSync } from 'child_process'
import { existsSync } from 'fs'
import { APP_CONFIG } from './src/shared/constants.js'

console.log(`Domain Name: ${APP_CONFIG.root_domain}`)

const skipBuild = process.argv.includes('--skip-build')
const branch =
  process.env.RELEASE_BRANCH ||
  execSync('git rev-parse --abbrev-ref HEAD').toString().trim()
console.log(`Releasing branch: ${branch}`)

let s3Path = 's3://reactjs.' + branch + '.' + APP_CONFIG.root_domain + '/'
console.log(`S3 Path: ${s3Path}`)

let cloudfrontPaths = '/*'
let distributionID = 'E2C4U4X1Z0FNSI'

if (branch === 'alpha') {
  distributionID = 'E2C4U4X1Z0FNSI'
} else if (branch === 'beta') {
  distributionID = 'E12GP2JL74BU7K'
} else if (branch === 'main') {
  distributionID = 'E29VD2O44QR728'
} else {
  throw new Error(`Unknown branch: ${branch}`)
}

if (skipBuild) {
  if (!existsSync('./dist/index.html')) {
    throw new Error('--skip-build was given, but there is no dist/index.html')
  }
} else {
  execSync('yarn build', { stdio: 'inherit' })
}
execSync(`aws s3 sync ./dist/ ${s3Path} --acl public-read --delete`, {
  stdio: 'inherit',
})
execSync(
  `aws cloudfront create-invalidation --distribution-id ${distributionID} --paths "${cloudfrontPaths}"`,
  { stdio: 'inherit' }
)
