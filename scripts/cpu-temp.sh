#!/bin/bash

cat /sys/class/thermal/thermal_zone0/temp | awk '{
  printf "cpu-temp, CPU Temperature, %1.0f", $0 / 1000
}'