'use strict';

module.exports.SocketEvent = {
  SysInfo: 'sys-info',
  SysUptime: 'sys-uptime',
  PublicIp: 'public-ip',
  CpuInfo: 'cpu-info',
  CpuTemp: 'cpu-temp',
  TotalMem: 'total-mem',
  FreeAvailableMem: 'free-available-mem'
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
    lscpu | egrep "Model" | awk '{$1=""; $2=""; printf "model: %s\\n", $0}' &&

    # CPU Architecture
    lscpu | egrep "Architecture" | awk '{$1="architecture:"; print $0}' &&

    # CPUs
    grep processor /proc/cpuinfo | wc -l | awk '{printf "cpus: %s\\n", $0}' &&

    # CPU Max MHz
    lscpu | egrep "max MHz" | awk '{printf "maxMhz: %1.2f\\n", $4}' &&

    # CPU Min MHz
    lscpu | egrep "min MHz" | awk '{printf "minMhz: %1.2f\\n", $4}'
  `,

  CpuTemp: `
    tempDir=/sys/class/thermal/thermal_zone0/temp &&
    cat $tempDir | awk '{printf "temp: %1.1f\\n", $0 / 1000}'
  `,

  TotalMem: `
    grep MemTotal /proc/meminfo | awk '{$1="total:"; print $0}'
  `,

  FreeAvailableMem: `
    # Free Memory
    grep MemFree /proc/meminfo | awk '{$1="free:"; print $0}' &&

    # Available Memory
    grep MemAvailable /proc/meminfo | awk '{$1="available:"; print $0}'
  `
};