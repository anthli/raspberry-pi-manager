#!/bin/bash

lscpu | grep "max MHz" | awk '{
  printf "cpu-max-clock, Max Clock Speed, %1.0f MHz", $4
}'