#!/bin/bash

hostname | awk '{
  printf "hostname, Hostname, %s", $0
}'