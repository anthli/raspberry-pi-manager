#!/bin/bash

lscpu | grep "min MHz" | awk '{
  printf "cpu-min-clock, Min Clock Speed, %1.0f MHz", $4
}'