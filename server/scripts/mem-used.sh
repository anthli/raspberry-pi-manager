#!/bin/bash

free | grep "Mem" | awk '{
  printf "mem-used, Used Memory, %s", $3
}'