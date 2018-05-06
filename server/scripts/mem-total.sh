#!/bin/bash

free | grep "Mem" | awk '{
  printf "mem-total, Total Memory, %1.0f MB", $2 / 1000
}'