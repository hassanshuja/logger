const moment = require('moment-timezone');

const { format, transports, createLogger } = require('winston');

const { combine, printf } = format;

// Standard BP Splunk Log Format
const BP_LOG_FORMAT_FN = printf((info) => `${info.timestamp} ${info.message}`);

// Standard EST time for Splunk
const BP_TIMESTAMP_FORMAT_FN = format((info) => {
  info.timestamp = moment()
    .tz('America/New_York')
    .format('YYYY-MM-DD HH:mm:ss.SSS z');
  return info;
});

const LOG_LEVEL = 'debug';
const SERVER_LOG_FILE_PATH = './logs/service.log';

const customLogger = (options) => {
  const logger = createLogger({
    format: combine(BP_TIMESTAMP_FORMAT_FN(), BP_LOG_FORMAT_FN),
    level: options.logLevel ? options.logLevel.toLowerCase() : LOG_LEVEL,
    transports: [
      new transports.File({
        filename: SERVER_LOG_FILE_PATH,
        handleExceptions: true,
        maxsize: options.maxsize || 5000000, // max size in bytes
        maxFiles: 7, // max no of files to keep
        colorize: false,
        tailable: true,
        humanReadableUnhandledException: true,
      }),
    ],
  });

  if (options.addConsoleTransport)
    logger.add(
      new transports.Console({
        format: combine(BP_TIMESTAMP_FORMAT_FN(), BP_LOG_FORMAT_FN),
        colorize: true,
      })
    );

  return logger;
};

module.exports = customLogger;
