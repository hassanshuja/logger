const AuditLogger = require('@sydney-broker-node-lib/logger');


const headers = {
    appName: 'BP NodeJS',
    fileName: 'bp file name',
    "x-b3-traceid": 'traceId data',
    "x-b3-spanid": 'spanid data',
    level: 'debug',
    message: 'some messagee from the logs',
    timeStamp: '06:30:00',
    options: {
        data: 'some data',
        informatin: 'some other information'
    }
  }

// console.log(new AuditLogger(headers)._getTraceInfo());
console.log(new AuditLogger(headers).Logger());
// console.log(new AuditLogger(headers).auditStart());
// console.log(new AuditLogger(headers).auditEnd());