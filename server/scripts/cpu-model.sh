#!/bin/bash

lscpu | grep "Model" | awk '{
  $1="";
  $2="";
  printf "cpu-model, Model, %s", $0
}'