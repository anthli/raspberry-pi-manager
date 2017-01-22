#!/bin/bash

uptime -p | sed 's/,//g' | awk '{
  printf "uptime, Uptime, %s", $0
}'