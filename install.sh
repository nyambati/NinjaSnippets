#!/usr/bin/env bash

# Sublime and vscode folders
VSCODE_SNIPPET_FOLDER="vscode"
SUBLIME_SNIPPET_FOLDER="ninjaSnippet"

if [[ uname -eq "Darwin" ]]; then
    SUBLIME_PACKAGE=$HOME/Library/Application\ Support/sublime\ Text\ 3/Packages
    VSCODE_PACKAGE=$HOME/Library/Application\ Support/Code/User/snippets
  else
    echo "This installation works for mac OSx at the moment. Use manual installation instead"
    exit 0
fi

#
function install_sublime_snippet() {
  if [[ -d "${SUBLIME_SNIPPET_FOLDER}" ]]; then
    cp -R $SUBLIME_SNIPPET_FOLDER "${SUBLIME_PACKAGE}/${SUBLIME_SNIPPET_FOLDER}"
  fi
}

function install_vscode_snippet() {
  if [[ -d "${VSCODE_SNIPPET_FOLDER}" ]]; then
    cp -R $VSCODE_SNIPPET_FOLDER/* "${VSCODE_PACKAGE}"
  fi
}

function install_vscode() {

  install_vscode_snippet

  if [[ "$?" -eq "0" ]]; then
    echo "=========================================================================="
    echo "============== VSCODE SNIPPET INSTALLATION SUCCESSFULL   ================="
    echo "=========================================================================="
    exit 0
  else
    echo "=========================================================================="
    echo "============== INSTALLATION FAILED, PLEASE TRY AGAIN   ========================"
    echo "=========================================================================="
    exit 1
  fi
}

function install_sublime() {

  install_sublime_snippet

  if [[ "$?" -eq "0" ]]; then
    echo "=========================================================================="
    echo "============== SUBLIME INSTALLATION SUCCESSFULL   ========================"
    echo "=========================================================================="
    exit 0
  else
    echo "=========================================================================="
    echo "============== INSTALLATION FAILED, PLEASE TRY AGAIN   ========================"
    echo "=========================================================================="
    exit 1
  fi
}

while getopts ":i:r:h:" opt; do
  case $opt in
    i)
      if [[ "${OPTARG}" == "sublime" ]]; then
        install_sublime
      elif [[ "${OPTARG}" == "vscode" ]]; then
        install_vscode
      fi
      ;;
    h)
      echo "-a was triggered, Parameter: $OPTARG" >&2
      ;;
    r)
      echo "-a was triggered, Parameter: $OPTARG" >&2
      ;;
    \?)
      echo "Invalid option: -$OPTARG" >&2
      exit 1
      ;;
    :)
      echo "Option -$OPTARG requires an argument." >&2
      exit 1
      ;;
  esac
done

PROGRAMME=$0

function programme_usage {
    echo "usage: $PROGRAMME [-ibch] <editor>"
    echo "  -i    Install snippets"
    echo "  -r    uninstall snippets"
    echo "  -h    display help"
    exit 1
}

if [ $# -eq 0 ]
  then
    programme_usage
fi