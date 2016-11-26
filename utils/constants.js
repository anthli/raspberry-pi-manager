'use strict';

module.exports.SocketEvent = {
  SysInfo: 'sys-info',
  SysUptime: 'sys-uptime',
  PublicIp: 'public-ip',
  CpuInfo: 'cpu-info',
  CpuTemp: 'cpu-temp',
  TotalMem: 'total-mem',
  AvailableMem: 'available-mem'
};

module.exports.Command = {
  SysInfo: `
    # Hostname
    hostname | awk '{printf "hostname: %s\\n", $0}' &&

    # Operating System
    lsb_release -d | awk '{$1=""; printf "os: %s\\n", $0}'
  `,

  SysUptime: `
    uptime -p | awk '{printf "uptime: %s\\n", $0}'
  `,

  PublicIp: `
    wget http://ipinfo.io/ip -qO - | awk '{printf "ip: %s\\n", $0}'
  `,

  CpuInfo: `
    # CPU Model
    lscpu | grep Model | awk '{$1=""; $2=""; printf "model: %s\\n", $0}' &&

    # CPU Architecture
    lscpu | grep "Architecture" | awk '{$1="architecture:"; print $0}' &&

    # CPUs
    dir=/proc/cpuinfo &&
    grep processor $dir | wc -l | awk '{printf "cpus: %s\\n", $0}' &&

    # CPU Max MHz
    lscpu | grep "max MHz" | awk '{printf "maxMhz: %1.2f\\n", $4}' &&

    # CPU Min MHz
    lscpu | grep "min MHz" | awk '{printf "minMhz: %1.2f\\n", $4}'
  `,

  CpuTemp: `
    dir=/sys/class/thermal/thermal_zone0/temp;
    cat $dir | awk '{printf "temp: %1.1f\\n", $0 / 1000}'
  `,

  TotalMem: `
    dir=/proc/meminfo &&
    grep MemTotal $dir | awk '{printf "total: %1.0f MB\\n", $2 / 1000}'
  `,

  AvailableMem: `
    # Available Memory
    dir=/proc/meminfo &&
    grep MemAvailable $dir | awk '{printf "available: %1.0f MB\\n", $2 / 1000}'
  `
};