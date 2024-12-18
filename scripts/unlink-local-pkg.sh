#!/bin/bash

# go to git root folder
ROOT_DIR=$(git rev-parse --show-toplevel) 
cd "$ROOT_DIR"

# reset local package and reinstall npm package
cd examples/example1/node_modules
rm -rf react-crisp-toast
pnpm install react-crisp-toast