#!/bin/bash
set -e

git config --global user.email "builds@travis-ci.org"
git config --global user.name "Travis CI"
export GIT_TAG=v$(node -p "require('./package.json').version")
git tag $GIT_TAG -a -m "Generated tag from TravisCI build $GIT_TAG"
git push --quiet https://$CONNECT_GITHUB_TOKEN@github.com/cloudblue/connect-fulfillment-zapier-app $GIT_TAG > /dev/null 2>&1
