#!/bin/bash

wget http://ipinfo.io/ip -qO - | awk '{
  printf "public-ip, Public IP, %s", $0
}'