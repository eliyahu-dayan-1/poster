import * as fs from 'fs';

const logsDir = './log.txt';
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

//define the time format
function getTime() {
  const now = new Date();
  return now.toUTCString();
}

function doLog(line, level = 'Debug') {
  if (typeof line !== 'string') line = JSON.stringify(line);
  line = `${getTime()} - ${level} - ${line}\n`;
  console.log(line);
  fs.appendFileSync('./logs/backend.log', line);
}

export function debug(line) {
  doLog(line, 'Debug');
}
export function info(line) {
  doLog(line, 'Info');
}
export function warn(line) {
  doLog(line, 'Warn');
}
export function error(line) {
  doLog(line, 'Error');
}
