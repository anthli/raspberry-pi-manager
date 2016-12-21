'use strict';

const path = require('path');

const dir = path.resolve(__dirname, '../');
const distDir = path.join(dir, 'dist/');
const publicDir = path.join(dir, 'public/');
const nodeModules = path.join(dir, 'node_modules/');

module.exports.DistDir = distDir;
module.exports.PublicDir = publicDir;
module.exports.IndexHtml = path.join(dir, 'index.html');

module.exports.NodeModules = {
  JQuery: path.join(nodeModules, 'jquery/dist/'),
  Highcharts: path.join(nodeModules, 'highcharts/'),
  Lodash: path.join(nodeModules, 'lodash/')
};

module.exports.Command = {
  // System information
  Hostname: `
    hostname | awk '{
      printf "{ \\
        \\"title\\": \\"Hostname\\", \\
        \\"hostname\\": \\"%s\\" \\
      }",
      $0
    }'
  `,

  OperatingSystem: `
    lsb_release -d | awk '{
      $1="";
      printf "{ \\
        \\"title\\": \\"Operating System\\", \\
        \\"os\\": \\"%s\\" \\
      }",
      $0
    }'
  `,

  TotalMemory: `
    # Total Memory
    free | grep "Mem" | awk '{
      printf "{ \\
        \\"title\\": \\"Total Memory\\", \\
        \\"totalMem\\": \\"%1.0f MB\\" \\
      }",
      $2 / 1000
    }'
  `,

  PublicIp: `
    wget http://ipinfo.io/ip -qO - | awk '{
      printf "{ \\
        \\"title\\": \\"Public IP\\", \\
        \\"publicIp\\": \\"%s\\" \\
      }",
      $0
    }'
  `,

  Uptime: `
    uptime -p | awk '{
      printf "{ \\
        \\"title\\": \\"Uptime\\", \\
        \\"uptime\\": \\"%s\\" \\
      }",
      $0
    }'
  `,

  // CPU information
  CpuModel: `
    # CPU Model
    lscpu | grep "Model" | awk '{
      $1="";
      $2="";
      printf "{ \\
        \\"title\\": \\"Model\\", \\
        \\"cpuModel\\": \\"%s\\" \\
      }",
      $0
    }'
  `,

  CpuArchitecture: `
    lscpu | grep "Architecture" | awk '{
      $1="";
      printf "{ \\
        \\"title\\": \\"Architecture\\", \\
        \\"cpuArchitecture\\": \\"%s\\" \\
      }",
      $0
    }'
  `,

  CpuCount: `
    lscpu | grep "CPU(s):" | awk '{
      printf "{ \\
        \\"title\\": \\"CPUs\\", \\
        \\"cpus\\": \\"%s\\" \\
      }",
      $2
    }'
  `,

  CpuMaxClock: `
    lscpu | grep "max MHz" | awk '{
      printf "{ \\
        \\"title\\": \\"Max Clock Speed\\", \\
        \\"cpuMaxMhz\\": \\"%1.0f MHz\\" \\
      }",
      $4
    }'
  `,

  CpuMinClock: `
    lscpu | grep "min MHz" | awk '{
      printf "{ \\
        \\"title\\": \\"Min Clock Speed\\", \\
        \\"cpuMinMhz\\": \\"%1.0f MHz\\" \\
      }",
      $4
    }'
  `,

  // Monitoring information
  CpuUsage: `
    top -b -n 2 -d 0.5 | grep "Cpu(s)" | tail -n 1 |
      awk '{printf "{
        \\"title\\": \\"CPU Usage\\",
        \\"cpuUsage\\": \\"%1.0f\\"
      }",
      $2 + $4
    }'
  `,

  CpuTemp: `
    cat /sys/class/thermal/thermal_zone0/temp |
      awk '{printf "{
        \\"title\\": \\"CPU Temperature\\",
        \\"cpuTemp\\": \\"%1.0f\\"
      }",
      $0 / 1000
    }'
  `,

  UsedMemory: `
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