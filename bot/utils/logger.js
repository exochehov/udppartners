import fs from 'fs/promises';
import path from 'path';

class Logger {
  constructor() {
    this.logDir = path.join(process.cwd(), 'logs');
    this.ensureLogDirectory();
  }

  async ensureLogDirectory() {
    try {
      await fs.mkdir(this.logDir, { recursive: true });
    } catch (error) {
      console.error('Error creating log directory:', error);
    }
  }

  async log(type, message, data = {}) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      type,
      message,
      ...data
    };

    const logFile = path.join(this.logDir, `${type}.log`);
    const logLine = JSON.stringify(logEntry) + '\n';

    try {
      await fs.appendFile(logFile, logLine);
    } catch (error) {
      console.error('Error writing to log file:', error);
    }

    // Also log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[${type.toUpperCase()}] ${message}`, data);
    }
  }

  error(message, error) {
    this.log('error', message, {
      error: error.message,
      stack: error.stack
    });
  }

  info(message, data) {
    this.log('info', message, data);
  }

  warn(message, data) {
    this.log('warn', message, data);
  }

  debug(message, data) {
    if (process.env.NODE_ENV === 'development') {
      this.log('debug', message, data);
    }
  }
}

export const logger = new Logger();