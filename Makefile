# -------------------------------------------------------------------------
# upload to AWS S3
# https://s3.console.aws.amazon.com/s3/buckets/reactjs.smarter.sh
# -------------------------------------------------------------------------
.PHONY: analyze init update build serve release

analyze:
	cloc . --exclude-ext=svg,zip --fullpath --not-match-d=smarter/smarter/static/assets/ --vcs=git

init:
	rm -rf .git/hooks/pre-commit .git/hooks/pre-commit.legacy
	rm -rf node_modules yarn.lock
	yarn cache clean
	yarn install

lint:
	npx prettier --write "src/**/*.{js,jsx,ts,tsx,json,css,scss,md}"

upgrade:
	yarn global add npm-check-updates
	ncu --upgrade --packageFile ./package.json
	yarn global upgrade
	yarn install --force

build:
	cp package.json public/package.json
	yarn build

test:
	yarn test

serve:
	yarn start

release:
	yarn release
