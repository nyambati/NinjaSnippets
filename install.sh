#!/usr/bin/env bash
set -e

# Sublime and vscode folders
VSCODE_SNIPPET_FOLDER="vscode"
SUBLIME_SNIPPET_FOLDER="ninjaSnippet"
PROGRAMME=$0

# check which machine is running the scipt
if [[ uname -eq "Darwin" ]]; then
    SUBLIME_PACKAGE=$HOME/Library/Application\ Support/sublime\ Text\ 3/Packages
    VSCODE_PACKAGE=$HOME/Library/Application\ Support/Code/User/snippets
  else
    echo "This installation works for mac OSx at the moment. Use manual installation instead"
    exit 0
fi

# script  for installing sublime snippet
function install_sublime_snippet() {
  if [[ -d "${SUBLIME_SNIPPET_FOLDER}" ]]; then
    cp -a $SUBLIME_SNIPPET_FOLDER/ "${SUBLIME_PACKAGE}/${SUBLIME_SNIPPET_FOLDER}"
  fi
}

# Insralling vscode snippets
function install_vscode_snippet() {
  if [[ -d "${VSCODE_SNIPPET_FOLDER}" ]]; then
    cp -R $VSCODE_SNIPPET_FOLDER/* "${VSCODE_PACKAGE}"
  fi
}

# User feedback for installing vscode
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

# User feedfack for installing sublime snippets
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

# program usage function
function programme_usage {
    echo "usage: $PROGRAMME [-irlh] <value>"
    echo "  -i    [-i <editor> ]     Install snippets"
    echo "  -r    [-r <editor> ]     Uninstall snippets"
    echo "  -l    [-l <language> ]   Language to unistall, works for VS Code only"
    echo "  -h                       Display help"
    exit 0
}

if [[ $# -eq 0 ]]; then
  programme_usage
  exit 1
fi

# usage prompr por ninja script
while getopts ":i:r:l:h" opt; do
  case $opt in
    i)
      if [[ "${OPTARG}" == "sublime" ]]; then
        install_sublime
      elif [[ "${OPTARG}" == "vscode" ]]; then
        install_vscode
      else
        echo "Commad ${OPTARG} was not found"
      fi
      ;;

    r) EDITOR=$OPTARG;;

    l) EDITOR_LANG=$OPTARG;;

    h) programme_usage ;;

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

# uninstall snippet
function uninstall_vscode() {
  rm -f "${VSCODE_PACKAGE}/${EDITOR_LANG}.json"
  if [[ "$?" -eq "0" ]]; then
    echo "============================================================="
    echo "Snippet for language ${EDITOR_LANG} removed successfully"
    echo " "
    echo " "
    exit 0
  else
    echo "============================================================="
    echo "snipptet for language ${EDITOR_LANG} failed, please try again"
    echo " "
    echo " "
    exit 1
  fi
}

function uninstall_sublime() {
  echo "============================================"
  echo "   unistalling sublime ninjaSnippet"
  rm -rf "${SUBLIME_PACKAGE}/${SUBLIME_SNIPPET_FOLDER}"
}

shift $(( OPTIND - 1 ))

if [ "$EDITOR" == "vscode" ] && [ -n "${EDITOR_LANG}" ]; then
  uninstall_vscode
elif [[ "${EDITOR}" == 'sublime' ]]; then
  uninstall_sublime
else
  echo "Missing or incorrent argument, check and try again"
fi

