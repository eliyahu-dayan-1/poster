import * as fs from 'fs';

const logsDir = 'apps/posts/src/logs';
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

//define the time format
function getTime() {
  const now = new Date();
  return now.toUTCString();
}

function doLog(line, level = 'Debug', shouldConsoleLogEither = false) {
  if (typeof line !== 'string') line = JSON.stringify(line);
  line = `[${getTime()}] - ${level} - ${line}\n`;
  if (shouldConsoleLogEither) console.log(line);
  fs.appendFileSync(`${logsDir}/backend.log`, line);
}

export function debug(line, shouldConsoleLogEither = false) {
  doLog(line, 'Debug', shouldConsoleLogEither);
}
export function info(line, shouldConsoleLogEither = false) {
  doLog(line, 'Info', shouldConsoleLogEither);
}
export function warn(line, shouldConsoleLogEither = false) {
  doLog(line, 'Warn', shouldConsoleLogEither);
}
export function error(line, shouldConsoleLogEither = false) {
  doLog(line, 'Error', shouldConsoleLogEither);
}
