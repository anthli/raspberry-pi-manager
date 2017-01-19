#!/bin/bash

lscpu | grep "Architecture" | awk '{
  $1="";
  printf "cpu-architecture, Architecture, %s", $0
}'