#!/bin/bash

free | grep "buffers/cache" | awk '{
  printf "used-memory, Used Memory, %s", $3
}'