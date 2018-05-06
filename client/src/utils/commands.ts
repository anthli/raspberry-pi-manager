export enum Commands {
  // System information
  HOSTNAME = 'hostname',
  OS = 'os',
  PUBLIC_IP = 'public-ip',
  UPTIME = 'uptime',

  // CPU information
  CPU_ARCH = 'cpu-arch',
  CPU_COUNT = 'cpu-count',
  CPU_MAX_CLOCK = 'cpu-max-clock',
  CPU_MIN_CLOCK = 'cpu-min-clock',
  CPU_MODEL = 'cpu-model',
  CPU_TEMP = 'cpu-temp',
  CPU_USAGE = 'cpu-usage',

  // Memory information
  MEM_BUFFERED = 'mem-buffered',
  MEM_CACHED = 'mem-cached',
  MEM_FREE = 'mem-free',
  MEM_TOTAL = 'mem-total',
  MEM_USED = 'mem-used'
}