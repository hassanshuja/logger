const process = require('process');
const path = require('path');
const CreateLogger = require('./helper/createLogger');
const prettyPrintObject = require('./helper/prettyPrintObject');
const fs = require('fs');

class AuditLogger {
  static Logger = undefined;
  static AppName = undefined;

  constructor(incomingReqHeaders, filename = __filename) {
    this.incomingReq = incomingReqHeaders;
    this.filename = fs.existsSync(filename)
      ? path.parse(filename).name
      : filename;
    this.data = incomingReqHeaders.options
      ? incomingReqHeaders.options.data
      : {};
    this.Logger = CreateLogger(this.incomingReq);
    this.AppName = incomingReqHeaders.appName;
  }

  static Initialize({ path, logLevel, env = false, appName, maxsize }) {
    if (!path || path == undefined || path == '') {
      console.error('Path Should not be Empty', __filename);
      throw new Error('Path should not be empty');
    }

    const options = {
      path,
      logLevel,
      addConsoleTransport: !/prod/i.test(env),
      maxsize,
    };
    this.Logger = CreateLogger(options);
    this.AppName = appName;
  }

  _getTraceInfo(obj) {
    const options = this.incomingReq;
    const info = {};

    info.traceId = options['trace-id'];
    info.spanId = options['span-id'];
    info.filename = this.filename;
    return (
      `${process.pid} [NODE-Thrd-BpRImg] ${
        path.parse(info.filename || __filename).name
      } ` +
      `${obj.level} [${this.AppName}, ` +
      `${info.traceId || '<No Request Context>'}, ${
        info.spanId || '<No Request Context>'
      }, false] ${obj.message}`
    );
  }

  auditStart() {
    this.startTime = new Date();
  }

  auditEnd(res) {
    try {
      if (!this.startTime) throw new Error('Audit not started!!');

      const responseTime = `${new Date() - this.startTime}`;

      const req = Object.assign({}, this.incomingReq);

      const blackListParamsConfig = req.blackListReq;
      if (blackListParamsConfig) {
        for (const prop in blackListParamsConfig) {
          var r = req;
          blackListParamsConfig[prop].map((key) => delete r[prop][key]);
        }
      }
      let message = `${process.pid} [NODE-Thrd-${this.appName}] ${this.filename} DEBUG [${this.appName},${req.traceId},${req.spanId}]},false]`;
      message = `${message} Request=[clientIPAddress=${req.client.localAddress}, httpMethod=${req.method}, endpointURI=${req.originalUrl},`;
      message = `${message} queryString={${
        Object.keys(req.query).length === 0 ? {} : JSON.stringify(req.query)
      }}, headerMap={${prettyPrintObject(req.headers)}},`;
      message = `${message} ResponseCode=${res.statusCode}, ReqProcessTime=${responseTime}, payload=${req.body} ]`;
      this.Logger.debug(message);
    } catch (err) {
      console.log(err);
    }
  }

  error(log) {
    this.Logger.error(this._getTraceInfo({ level: 'error', message: log }));
  }

  debug(log) {
    this.Logger.debug(this._getTraceInfo({ level: 'debug', message: log }));
  }
  info(log) {
    this.Logger.info(this._getTraceInfo({ level: 'info', message: log }));
  }
}

module.exports = AuditLogger;
