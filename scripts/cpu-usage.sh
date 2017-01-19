#!/bin/bash

top -b -n 2 -d 0.5 | grep "Cpu(s)" | tail -n 1 | awk '{
  printf "cpu-usage, CPU Usage, %1.0f", $2 + $4
}'