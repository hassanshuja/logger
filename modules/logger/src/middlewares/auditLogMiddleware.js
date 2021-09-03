const AuditLogger = require('../AuditLogger');

function auditsLogger(req, res, next) {
  try {
    const logger = new AuditLogger(req, __filename);
    logger.auditStart();
    logger.auditEnd(res);
  } catch (error) {
    return error;
  }

  next();
}

module.exports = auditsLogger;
