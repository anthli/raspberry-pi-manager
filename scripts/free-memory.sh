#!/bin/bash

free | grep "buffers/cache" | awk '{
  printf "free-memory, Free Memory, %s", $4
}'