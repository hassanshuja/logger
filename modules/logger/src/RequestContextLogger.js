const process = require('process');
const BaseLogger = require('./BaseLogger')

class RequestContextLogger extends BaseLogger {
    constructor(incomingRequest, filename = __filename) {
        super(filename);
        this.incomingReq = Object.assign({}, incomingRequest);
    }

    _getTraceInfo({ level, message }) {
        const { traceId, spanId } = this.incomingReq;

        return `${process.pid} [NODE-Thrd-${this.appName}] ${this.filename} ${level} [${this.appName}, ${traceId || '<No Request Context>'}, ${spanId || '<No Request Context>'}, false] ${message}`;
    }
}

module.exports = RequestContextLogger