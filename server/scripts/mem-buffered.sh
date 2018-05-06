#!/bin/bash

free | grep "Mem" | awk '{
  printf "buffered-memory, Buffered Memory, %s", $6
}'