#!/bin/bash

cat << heredoc

Creating Module... 🔧🔧🔧

heredoc

function createClass(){
  printf "
class $1 ""{""
  constructor() ""{"" ""}""
""}""

module.exports = $1;

  " >> "$2/$4.$3.js"
}

function createFuntion(){
  printf "
  const $1 = () => ""{"" ""}""
  module.exports = $1;
  " >> "$2/$4.$3.js"
}

function makeFiles(){

  touch "$1/$3.$2.js"
  touch "$1/tests/$3.spec.js"

  if [[ $2 == "data-access" ]]
  then
    TRANSFORM_MODULE_TYPE="DataAccess"

    CLASS_NAME=$4$TRANSFORM_MODULE_TYPE
    createFuntion $CLASS_NAME $1 $2 $3

  else
    TRANSFORM_MODULE_TYPE=$(echo $2 |  awk '{print (toupper(substr($0, 1, 1)) tolower(substr($0, 2)))}')

    CLASS_NAME=$4$TRANSFORM_MODULE_TYPE

    createClass $CLASS_NAME $1 $2 $3
  fi

}

function makeDir(){
  mkdir -p $1
  mkdir -p "$1/tests"
}

INITIAL_MODULE_NAME=$1

MODULE_NAME=$(
  echo $INITIAL_MODULE_NAME | 
  awk '{print (toupper(substr($0, 1, 1)) tolower(substr($0, 2)))}' | 
  sed -e "s/-/ /g" | awk '{for (i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) substr($i,2)} 1' | 
  sed -e "s/ //g")

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
  makeFiles "$MODULE_DIR" "controller" "$INITIAL_MODULE_NAME" "$MODULE_NAME"
  makeFiles "$MODULE_DIR" "service" "$INITIAL_MODULE_NAME" "$MODULE_NAME"
  makeFiles "$MODULE_DIR" "data-access" "$INITIAL_MODULE_NAME" "$MODULE_NAME"
fi

cat << heredoc

$MODULE_NAME Module Successfully created!!! 🚀🚀🚀

heredoc
