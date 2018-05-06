#!/bin/bash

lsb_release -d | awk '{
  $1="";
  printf "os, Operating System, %s", $0
}'