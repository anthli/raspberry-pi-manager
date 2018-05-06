#!/bin/bash

free | grep "Mem" | awk '{
  printf "mem-available, Available Memory, %s", $7
}'