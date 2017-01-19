#!/bin/bash

free | grep "Mem" | awk '{
  printf "cached-memory, Cached Memory, %s", $7
}'