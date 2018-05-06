#!/bin/bash

free | grep "Mem" | awk '{
  printf "total-memory, Total Memory, %1.0f MB", $2 / 1000
}'