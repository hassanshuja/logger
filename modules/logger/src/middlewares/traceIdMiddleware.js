const uuidGeneratorV1 =  require('uuid/v1');

function setupTraceId(req, res, next) {
    if (!req.headers['x-b3-traceid']) {
        req.headers['x-b3-traceid'] = uuidGeneratorV1().replace(/-/g, '').substring(0, 16);
    }

    req.traceId = req.headers['x-b3-traceid'];
    req.parentSpanId = req.headers['x-b3-parentspanid'] || uuidGeneratorV1().replace(/-/g, '').substring(0, 16);
    req.spanId = req.headers['x-b3-spanid'] || uuidGeneratorV1().replace(/-/g, '').substring(0, 16);

    next();
}

module.exports = setupTraceId