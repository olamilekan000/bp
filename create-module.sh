#!/bin/bash

cat << heredoc

Creating Module... 🔧🔧🔧

heredoc

function makeFiles(){

  touch "$1/$3.$2.js"

  if [[ $2 == "data-access" ]]
  then
    TRANSFORM_MODULE_TYPE="DataAccess"
  else
    TRANSFORM_MODULE_TYPE=$(echo $2 |  awk '{print (toupper(substr($0, 1, 1)) tolower(substr($0, 2)))}')
  fi

  CLASS_NAME=$4$TRANSFORM_MODULE_TYPE

  printf "
class $CLASS_NAME""{""
  constructor() ""{"" ""}""
""}""

module.exports = $CLASS_NAME;

  " >> "$1/$3.$2.js"
}

function makeDir(){
  mkdir -p $1
}

INITIAL_MODULE_NAME=$1

MODULE_NAME=$(echo $INITIAL_MODULE_NAME |  awk '{print (toupper(substr($0, 1, 1)) tolower(substr($0, 2)))}')

if [[ ! "$MODULE_NAME" ]]
then
  echo "Please Enter a Module Name"
  exit 1
fi

MODULE_DIR="$PWD/src/modules/$MODULE_NAME"

if [[ -d "$MODULE_DIR" ]]
then
  printf "$MODULE_NAME Module already exists. \n\n" 
  exit 1 
else
  makeDir "$MODULE_DIR"
  makeFiles "$MODULE_DIR" "controllers" "$INITIAL_MODULE_NAME" "$MODULE_NAME"
  makeFiles "$MODULE_DIR" "services" "$INITIAL_MODULE_NAME" "$MODULE_NAME"
  makeFiles "$MODULE_DIR" "data-access" "$INITIAL_MODULE_NAME" "$MODULE_NAME"
fi

cat << heredoc

$MODULE_NAME Module Successfully created!!! 🚀🚀🚀

heredoc
