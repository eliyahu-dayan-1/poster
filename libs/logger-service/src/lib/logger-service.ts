import * as mongodb from 'mongodb';
import * as fs from 'fs';

class Logger {
  logOutputDir;
  constructor(logOutputDir: string) {
    this.logOutputDir = logOutputDir;
    if (!fs.existsSync(`${this.logOutputDir}/logs`)) {
      fs.mkdirSync(`${this.logOutputDir}/logs`);
    }
  }

  getTime() {
    const now = new Date();
    return now.toUTCString();
  }

  doLog(line: any, level = 'Debug', shouldConsoleLogEither = false) {
    if (typeof line !== 'string') line = JSON.stringify(line);
    line = `[${this.getTime()}] - ${level} - ${line}\n`;
    if (shouldConsoleLogEither) console.log(line);
    fs.appendFileSync(`${this.logOutputDir}/logs/backend.log`, line);
  }

  debug(line: any, shouldConsoleLogEither = false) {
    this.doLog(line, 'Debug', shouldConsoleLogEither);
  }
  info(line: any, shouldConsoleLogEither = false) {
    this.doLog(line, 'Info', shouldConsoleLogEither);
  }
  warn(line: any, shouldConsoleLogEither = false) {
    this.doLog(line, 'Warn', shouldConsoleLogEither);
  }
  error(line: any, shouldConsoleLogEither = false) {
    this.doLog(line, 'Error', shouldConsoleLogEither);
  }

  log(line: any, shouldConsoleLogEither = false) {
    this.doLog(line, 'log', shouldConsoleLogEither);
  }
}

export default Logger;
