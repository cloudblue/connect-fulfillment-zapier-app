#!/bin/bash
set -e


CONNECT_ZAPIER_VERSION=$(node -p "require('./package.json').version")

echo "Deploy Connect Fulfillment Zapier App version $CONNECT_ZAPIER_VERSION to zapier...."

echo "Generate rc files..."

cat >$HOME/.zapierrc<<EOF
{
  "deployKey": "$CONNECT_ZAPIER_DEPLOY_KEY"
}
EOF

cat >.zapierapprc<<EOF
{
  "id": $CONNECT_ZAPIER_APP_ID,
  "key": "CloudBlueConnect"
}
EOF

echo "push app to zapier..."

zapier push

echo "set partner token..."

zapier env:set $CONNECT_ZAPIER_VERSION CONNECT_PARTNER_TOKEN=$CONNECT_PARTNER_TOKEN > /dev/null 2>&1

echo "Done!"
