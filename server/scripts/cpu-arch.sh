#!/bin/bash

lscpu | grep "Architecture" | awk '{
  $1="";
  printf "cpu-arch, Architecture, %s", $0
}'