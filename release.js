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
import { outputFile, prerenderPaths, s3Key } from './src/routes/prerender.js'

console.log(`Domain Name: ${APP_CONFIG.root_domain}`)

const skipBuild = process.argv.includes('--skip-build')
const branch =
  process.env.RELEASE_BRANCH ||
  execSync('git rev-parse --abbrev-ref HEAD').toString().trim()
console.log(`Releasing branch: ${branch}`)

const bucket = `reactjs.${branch}.${APP_CONFIG.root_domain}`
const s3Path = `s3://${bucket}/`
console.log(`S3 Path: ${s3Path}`)

const cloudfrontPaths = '/*'

// The distribution whose S3 origin is this branch's bucket. An S3 origin's domain name starts with
// the bucket's name (<bucket>.s3.amazonaws.com, or <bucket>.s3-website-<region>.amazonaws.com), and
// the trailing dot keeps one bucket's name from matching another that starts with it.
const distributionID = execSync(
  'aws cloudfront list-distributions --output text --query ' +
    `"DistributionList.Items[?Origins.Items[?starts_with(DomainName, '${bucket}.')]].Id"`
)
  .toString()
  .trim()
if (!distributionID || distributionID === 'None' || /\s/.test(distributionID)) {
  throw new Error(
    `Expected one CloudFront distribution with an origin in ${bucket}, found: "${distributionID}"`
  )
}
console.log(`CloudFront distribution: ${distributionID}`)

if (skipBuild) {
  if (!existsSync('./dist/index.html')) {
    throw new Error('--skip-build was given, but there is no dist/index.html')
  }
} else {
  execSync('yarn build', { stdio: 'inherit' })
}
// Each page's pre-rendered HTML (scripts/prerender.mjs) is uploaded to the key of its url's path,
// e.g. case-studies/stackademy, with no extension: CloudFront asks the bucket for that key, and
// serves index.html, rendered for /, only for urls that have no page. The sync leaves those keys
// alone (--exclude also keeps --delete from removing them), and the pages are uploaded after it.
const pageKeys = prerenderPaths()
  .map((path) => ({ path, key: s3Key(path) }))
  .filter(({ key }) => key !== 'index.html')
const excludes = pageKeys.map(({ key }) => `--exclude "${key}"`).join(' ')
execSync(`aws s3 sync ./dist/ ${s3Path} --acl public-read --delete ${excludes}`, {
  stdio: 'inherit',
})
for (const { path, key } of pageKeys) {
  execSync(
    `aws s3 cp ./dist/${outputFile(path)} ${s3Path}${key} --acl public-read --content-type "text/html"`,
    { stdio: 'inherit' }
  )
}
execSync(
  `aws cloudfront create-invalidation --distribution-id ${distributionID} --paths "${cloudfrontPaths}"`,
  { stdio: 'inherit' }
)
