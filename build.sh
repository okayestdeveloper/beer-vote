#! /bin/zsh
if [ -z "$NODE_ENV" ]
then
	print "\$NODE_ENV is empty. Halting."
  exit 1
else
	print "Environment: $NODE_ENV"
fi

ENV_FILE=./site/.env.$NODE_ENV
if test -f "$ENV_FILE"
then
	print "Environment file: $ENV_FILE"
else
	print "$ENV_FILE does not exist. Halting."
  exit 2
fi

cd functions
yarn build
cd ../site
yarn build
cd ..
