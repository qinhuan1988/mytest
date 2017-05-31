#!/bin/bash

set -e

export PATH="/usr/local/bin:$PATH"
export LC_ALL="en_US.UTF-8"
export LANG="en_US.UTF-8"

npm install
npm run test
npm run build:${ENV}
npm run predist
npm run postdist
