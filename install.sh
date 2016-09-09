#!/usr/bin/env bash

# This file will move the built to sublime package folder
#

SNIPPET_FOLDER="ninjaSnippet"

function install_snippet() {
  if [[ -d $SNIPPET_FOLDER ]]; then
    rm -rf $HOME/Library/Application\ Support/sublime\ Text\ 3/Packages/$SNIPPET_FOLDER
    cp -R $SNIPPET_FOLDER $HOME/Library/Application\ Support/sublime\ Text\ 3/Packages
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
