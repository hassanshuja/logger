const TestClass = require('./testClass');
const {logger, BaseLogger, AuditLogger, AuditLogMiddleware, traceIdMiddleware } = require('./logger')
const auditsLogger = require('./logger/src/middlewares/auditLogMiddleware')
const bpBaseRouter = require('./logger/src/middlewares/bpBaseRouter')
const express = require('express');
const app = express();
const port = 3000;



// const reqObj = {
//   client: {
//     localAddress: '192.168.0.1',
//   },
//  "trace-id": "x-b3-traceid",
//  "span-id": "x-b3-spanid",
//  "parent-span-id": "x-b3-parentspanid",
//  appName: 'sydney-stock',
//  path :"./logs/audit.log",
//  logLevel: "DEBUG",
//  env: "local",
//  maxsize: 500000
// }

// const res = {
// "sample-value": "value1"
// }



// this.logger = new AuditLogger(reqObj, __filename);

//  AuditLogger.Initialize({
//   path :"./logs/audit.log",
//   logLevel: "DEBUG",
//   env: "local",
//   appName: 'sydney-broker-node-lib',
//   maxsize: 500000
// });



// console.error("audit logger output", auditsLogger(reqObj, res, () => {}))

this.defaultMiddleware = [auditsLogger, traceIdMiddleware]
app.use(this.defaultMiddleware);


app.get('/api/howdy', function(req, res, next){
  res.status(200).send(reqObj)
});

app.listen(port, function(err){
  if (err) 
    console.error("Error in server setup")
      
  console.error("Server listening on Port", port);
})



// setInterval(() => {
//     logger.debug('Debug message')
// }, 500)

module.exports = {
  TestClass,
  logger
}