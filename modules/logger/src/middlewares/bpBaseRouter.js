const express = require('express');
const bodyparser = require('body-parser');
const multer = require('multer');

// const traceIdMiddleware = require('./traceIdMiddleware')
const  { BaseLogger, AuditLogMiddleware, traceIdMiddleware } =  require('../../../logger');

class bpBaseRouter {
    constructor() {

        this.router = express.Router();
        this.getRequestHandlers = [];
        this.postRequestHandlers = [];
        // this.logger = new BaseLogger(__filename);

        this.defaultMiddleware = [traceIdMiddleware, AuditLogMiddleware];

        this.initializeRoutes();
        this.startRoutes();
        this.router.use(bodyparser.urlencoded({ extended: true }));
        this.router.use(bodyparser.json());

        console.log('working')
    }

    initializeRoutes() {
        this.getRequestHandlers.push({
            path: "/api/howdy",
          });

        this.postRequestHandlers.push({
            path: "/api/wow",
        });
        // this.logger.debug("Initializing routes");
    }

    async destroy() {
        this.logger.debug("Releasing resources - Base Router")
    }

    _mergeRouteHandlers(routeResolver) {
        return [].concat(this.defaultMiddleware);
    }

    startRoutes() {
        
        // default method - empty - for subclasses to override
        this.getRequestHandlers.length > 0 && this.getRequestHandlers.forEach((val, index) => {
            this.router.get(val.path, this._mergeRouteHandlers(val.handler));
        })
       
        this.postRequestHandlers.length > 0 && this.postRequestHandlers.forEach((val, index) => {
            this.router.post(val.path, new multer().array(), this._mergeRouteHandlers(val.handler));
        })
    }

    router() {
        
        return this.router;
    }
}


module.exports = bpBaseRouter