# -------------------------------------------------------------------------
# upload to AWS S3
# https://s3.console.aws.amazon.com/s3/buckets/reactjs.smarter.sh
# -------------------------------------------------------------------------
.PHONY: help analyze init lint upgrade build test serve release

# The first target is make's default, so a bare `make` prints this menu. Each target's
# description is the `## ` comment on its own line.
.DEFAULT_GOAL := help

help: ## Show this menu of commands
	@grep -E '^[a-zA-Z_-]+:.*## ' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*## "}; {printf "  \033[36m%-10s\033[0m %s\n", $$1, $$2}'

analyze: ## Count lines of code with cloc
	cloc . --exclude-ext=svg,zip,css --fullpath --not-match-d=smarter/smarter/static/assets/ --vcs=git

init: ## Reinstall node_modules from scratch
	rm -rf .git/hooks/pre-commit .git/hooks/pre-commit.legacy
	rm -rf node_modules yarn.lock
	yarn cache clean
	yarn install

lint: ## Format src/ with Prettier
	npx prettier --write "src/**/*.{js,jsx,ts,tsx,json,css,scss,md}"

upgrade: ## Upgrade every dependency to its latest version
	yarn global add npm-check-updates
	ncu --upgrade --packageFile ./package.json
	yarn global upgrade
	yarn install --force

build: ## Build the site into dist/
	cp package.json public/package.json
	yarn build

test: ## Run the Jest test suite
	yarn test

serve: ## Start the dev server on localhost:5173
	yarn start

release: ## Deploy dist/ to S3 and CloudFront
	yarn release
