#!/bin/bash

uptime -p | awk '{
  printf "uptime, Uptime, %s", $0
}'