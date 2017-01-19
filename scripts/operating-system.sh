#!/bin/bash

lsb_release -d | awk '{
  $1="";
  printf "operating-system, Operating System, %s", $0
}'