const AuditLogger = require('../AuditLogger');


function auditsLogger(req, res, next) {
    
    this.logger = new AuditLogger(req, __filename); 
    console.log('working')
    try {
        const logger = new AuditLogger(req, __filename);
        logger.auditStart();
        logger.auditEnd(res);
       
    } catch (error) {
        this.logger.error(`Failed capturing auditLog. Reason: ${error}, ${JSON.stringify(error)}`);
        return JSON.stringify(`${error}`);
    }

    next();
}

module.exports = auditsLogger;