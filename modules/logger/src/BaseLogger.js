const fs = require('fs');
const process = require('process');
const path = require('path');
const CreateLogger = require('./helper/createLogger')

class BaseLogger {

    static Logger = undefined;
    static AppName = undefined;

    constructor(req, filename = __filename) {
        this.AppName = req.appName;
        this.filename = fs.existsSync(filename) ? path.parse(filename).name : filename;
        this.Logger = CreateLogger(req);
    }

    _getTraceInfo({ level, message }) {
        try {
            return `${process.pid} [NODE-Thrd-${this.AppName}] ${this.filename} ${level} [${this.AppName}, ${'<No Request Context>'}, ${'<No Request Context>'}, false] ${message}`;
        } catch (err) {
            console.error('logger._getTraceInfo failed', err);
        }
    }

    error(log) {
        this.Logger.error(this._getTraceInfo({ level: "error", message: log }));
    }

    debug(log) {
        this.Logger.debug(this._getTraceInfo({ level: "debug", message: log }));
    }
    info(log) {
        this.Logger.info(this._getTraceInfo({ level: "info", message: log }));
    }
    warn(log){
        this.Logger.info(this._getTraceInfo({ level: "warn", message: log }));
    }
}


module.exports = BaseLogger
