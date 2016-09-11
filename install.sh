#!/usr/bin/env bash

# This file will move the built to sublime package folder

SNIPPET_FOLDER="ninjaSnippet"

# If your machine is mac osX
if [[ uname -eq "Darwin" ]]; then
  PACKAGE_FOLDER=$HOME/Library/Application\ Support/sublime\ Text\ 3/Packages
else
  echo "This installation works for mac OSx at the moment. Use manual installation instead"
  exit 0
fi

function install_snippet() {
  if [[ -d $SNIPPET_FOLDER ]]; then
    rm -rf "${PACKAGE_FOLDER}/${SNIPPET_FOLDER}"
    cp -R $SNIPPET_FOLDER "${PACKAGE_FOLDER}/${SNIPPET_FOLDER}"
  fi
}

install_snippet

if [[ "$?" -eq "0" ]];
  then
    echo "installation successful"
    exit 0
else
  echo "installation failed, please try again"
  exit 1
fi
