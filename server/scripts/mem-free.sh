#!/bin/bash

free | grep "Mem" | awk '{
  printf "mem-free, Free Memory, %s", $4
}'