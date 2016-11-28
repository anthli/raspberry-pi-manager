'use strict';

const path = require('path');

const dir = __dirname;
const publicDir = path.join(dir, '../public/');
const nodeModules = path.join(__dirname, '../node_modules/');

module.exports.PublicDir = publicDir;
module.exports.IndexHtml = path.join(publicDir, 'index.html');

module.exports.NodeModules = {
  JQuery: path.join(nodeModules, 'jquery/dist/'),
  Highcharts: path.join(nodeModules, 'highcharts/'),
  Lodash: path.join(nodeModules, 'lodash/')
};

module.exports.Command = {
  SysInfo: `
    # Hostname
    hostname | awk '{printf "hostname: %s\\n", $0}' &&

    # Operating System
    lsb_release -d | awk '{$1=""; printf "os: %s\\n", $0}' &&

    # Total Memory
    grep MemTotal /proc/meminfo |
      awk '{printf "totalMem: %1.0f MB\\n", $2 / 1000}'
  `,

  PublicIp: `
    wget http://ipinfo.io/ip -qO - | awk '{printf "publicIp: %s\\n", $0}'
  `,

  Uptime: `
    uptime -p | awk '{printf "uptime: %s\\n", $0}'
  `,

  CpuInfo: `
    # CPU Model
    lscpu | grep Model | awk '{$1=""; $2=""; printf "cpuModel: %s\\n", $0}' &&

    # CPU Architecture
    lscpu | grep "Architecture" | awk '{$1="cpuArchitecture:"; print $0}' &&

    # CPUs
    lscpu | grep "CPU(s):" | awk '{printf "cpus: %s\\n", $2}' &&

    # CPU Max MHz
    lscpu | grep "max MHz" | awk '{printf "cpuMaxMhz: %1.2f\\n", $4}' &&

    # CPU Min MHz
    lscpu | grep "min MHz" | awk '{printf "cpuMinMhz: %1.2f\\n", $4}'
  `,

  CpuLoad: `
    top -b -n 2 -d 0.5 | grep "Cpu(s)" | tail -n 1 |
      awk '{printf "cpuLoad: %1.0f\\n", $2 + $4}'
  `,

  CpuTemp: `
    cat /sys/class/thermal/thermal_zone0/temp |
      awk '{printf "cpuTemp: %1.0f\\n", $0 / 1000}'
  `,

  MemUsage: `
    # Total Memory
    total=$(grep MemTotal /proc/meminfo | awk '{printf "%1.0f", $2}') &&

    # Free Memory
    grep MemFree /proc/meminfo |
      awk -v total="$total" '{printf "freeMem: %0.2f\\n", $2 / total}' &&

    # Available Memory
    grep MemAvailable /proc/meminfo |
      awk -v total="$total" '{printf "availableMem: %0.2f\\n", $2 / total}' &&

    # Buffered Memory
    grep Buffers /proc/meminfo |
      awk -v total="$total" '{printf "bufferedMem: %0.2f\\n", $2 / total}' &&

    # Cached Memory
    grep Cached /proc/meminfo | head -n 1 |
      awk -v total="$total" '{printf "cachedMem: %0.2f\\n", $2 / total}'
  `
};