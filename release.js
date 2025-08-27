const { execSync } = require('child_process')
const { domainName } = require('./src/shared/constants')

const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim()
let s3Path = 's3://reactjs.' + branch + '.' + domainName + '/'
let cloudfrontPaths = '/*'
let distributionID = 'SET-ME-PLEASE'

if (branch === 'alpha') {
  distributionID = 'SET-ME-PLEASE'
} else if (branch === 'beta') {
  distributionID = 'SET-ME-PLEASE'
} else if (branch === 'main') {
  distributionID = 'SET-ME-PLEASE'
} else {
  throw new Error(`Unknown branch: ${branch}`)
}

execSync('yarn build')
execSync(`aws s3 sync ./build/ ${s3Path} --acl public-read --delete ...`)
execSync(
  `aws cloudfront create-invalidation --distribution-id ${distributionID} --paths "${cloudfrontPaths}"`
)
