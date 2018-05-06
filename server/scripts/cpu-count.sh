#!/bin/bash

lscpu | grep "CPU(s):" | awk '{
  printf "cpu-count, CPUs, %s", $2
}'