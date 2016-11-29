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
    free | grep "Mem" | awk '{printf "totalMem: %1.0f MB\\n", $2 / 1000}'
  `,

  PublicIp: `
    wget http://ipinfo.io/ip -qO - | awk '{printf "publicIp: %s\\n", $0}'
  `,

  Uptime: `
    uptime -p | awk '{printf "uptime: %s\\n", $0}'
  `,

  CpuInfo: `
    # CPU Model
    lscpu | grep "Model" | awk '{$1=""; $2=""; printf "cpuModel: %s\\n", $0}' &&

    # CPU Architecture
    lscpu | grep "Architecture" | awk '{$1="cpuArchitecture:"; print $0}' &&

    # CPUs
    lscpu | grep "CPU(s):" | awk '{printf "cpus: %s\\n", $2}' &&

    # CPU Max MHz
    lscpu | grep "max MHz" | awk '{printf "cpuMaxMhz: %1.0f MHz\\n", $4}' &&

    # CPU Min MHz
    lscpu | grep "min MHz" | awk '{printf "cpuMinMhz: %1.0f MHz\\n", $4}'
  `,

  CpuUsage: `
    top -b -n 2 -d 0.5 | grep "Cpu(s)" | tail -n 1 |
      awk '{printf "cpuUsage: %1.0f\\n", $2 + $4}'
  `,

  CpuTemp: `
    cat /sys/class/thermal/thermal_zone0/temp |
      awk '{printf "cpuTemp: %1.0f\\n", $0 / 1000}'
  `,

  MemUsage: `
    # Total Memory
    total=$(free | grep "Mem" | awk '{print $2}') &&
    echo $total | awk '{printf "totalMem: %s\\n", $0}' &&

    # Used Memory
    free | grep "buffers/cache" |
      awk -v total="$total" '{printf "usedMem: %s\\n", $3}' &&

    # Free Memory
    free | grep "buffers/cache" |
      awk -v total="$total" '{printf "freeMem: %s\\n", $4}' &&

    # Buffered Memory
    free | grep "Mem" |
      awk -v total="$total" '{printf "bufferedMem: %s\\n", $6}' &&

    # Cached Memory
    free | grep "Mem" |
      awk -v total="$total" '{printf "cachedMem: %s\\n", $7}'
  `
};