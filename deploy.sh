#!/bin/bash
set -e

WHOAMI=$(whoami)

CONNECT_ZAPIER_VERSION=$(node -p "require('./package.json').version")

echo "Deploy Connect Fulfillment Zapier App version $CONNECT_ZAPIER_VERSION to zapier...."

echo "Validate version...."

# zapier validate

echo "Generate rc files..."

cat >$HOME/.zapierrc<<EOF
{
  "deployKey": "$CONNECT_ZAPIER_DEPLOY_KEY"
}
EOF

echo "Home is $HOME and user is $WHOAMI"

tail -2 $HOME/.zapierrc |cut -b 1-20

echo "***************"

cat >.zapierapprc<<EOF
{
  "id": 78494,
  "key": "App78494"
}
EOF

echo "push app to zapier..."

zapier push

echo "set partner token..."

zapier env:set CONNECT_PARTNER_TOKEN=$CONNECT_PARTNER_TOKEN

echo "Done!"
