#!/bin/bash

free | grep "Mem" | awk '{
  printf "mem-buffered, Buffered Memory, %s", $6
}'