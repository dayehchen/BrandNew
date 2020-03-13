#!/bin/bash

set -x
# Create list of files based on the component name
if [ $1 == 'base' ]
then
  find src hierdesign rdi .rdi.cfg > $2
else
  mkdir -p build prep
  find src build prep -type f -not -path "build/toArchive/*" -not -path "build/dist/*" -not -path "build/publications/*" -not -path "build/build-info.json" -not -path "build/manifests/*" > $2
fi

# Create sorted lists
sort $2 > $3

# Remove unsorted list
rm -f $2