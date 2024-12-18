#!/bin/bash

# go to git root folder
ROOT_DIR=$(git rev-parse --show-toplevel) 
cd "$ROOT_DIR"

# register local package as global
cd react-crisp-toast
pnpm build
pnpm link --global

# link local package
cd ../examples/example1
pnpm remove react-crisp-toast
pnpm link --global react-crisp-toast