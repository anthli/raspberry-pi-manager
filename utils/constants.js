'use strict';

module.exports.SocketEvent = {
  CpuInfo: 'cpuinfo',
  MemInfo: 'meminfo',
  SysInfo: 'sysinfo'
};

module.exports.Command = {
  SysInfo: `
    # Hostname
    hostname | awk '{printf "hostname: %s\\n", $0}' &&

    # Operating System
    lsb_release -d | awk '{$1=""; printf "os: %s\\n", $0}' &&

    # Uptime
    uptime | awk '{printf "uptime: %s\\n", $1}' &&

    # Public IP
    wget http://ipinfo.io/ip -qO - | awk '{printf "ip: %s\\n", $0}'
  `,

  CpuInfo: `
    # CPU Model
    lscpu | egrep "Model" | awk '{$1=""; $2=""; printf "model: %s\\n", $0}' &&

    # CPU Architecture
    lscpu | egrep "Architecture" | awk '{$1="architecture:"; print $0}' &&

    # CPUs
    lscpu | egrep "CPU\(s\):" | awk '{$1="cpus:"; print $0}' &&

    # CPU Max MHz
    lscpu | egrep "max MHz" | awk '{printf "maxMhz: %1.2f\\n", $4}' &&

    # CPU Min MHz
    lscpu | egrep "min MHz" | awk '{printf "minMhz: %1.2f\\n", $4}' &&

    # CPU temperature
    tempDir=/sys/class/thermal/thermal_zone0/temp &&
    cat $tempDir | awk '{printf "temp: %1.1f\\n", $0 / 1000}'
  `,

  MemInfo: `
    # Total Memory
    grep MemTotal /proc/meminfo | awk '{$1="total:"; print $0}' &&

    # Free Memory
    grep MemFree /proc/meminfo | awk '{$1="free:"; print $0}' &&

    # Available Memory
    grep MemAvailable /proc/meminfo | awk '{$1="available:"; print $0}'
  `
};