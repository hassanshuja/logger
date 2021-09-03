import bodyparser from "body-parser";
import bpBaseRouter from "./bpBaseRouter.js";
import IncomingBusinessService from "./../services/incomingBusinessServiceV1";
import userProfileMiddlewareV2 from "./userProfileMiddlewareV2";
import producerInfoMiddleware from './producerInfoMiddleware';
import lineOfBusinessMiddleware from "./lineOfBusinessMiddleware";
import AppsStatsService from "../services/appsStatsService";
import IncomingBusinessServiceV2 from "./../services/incomingBusinessServiceV2";
import ApplicationDetailsServiceV2 from "./../services/getApplicationDetailsServiceV1";
import AgentOfRecordServiceV1 from "../services/agentOfRecordServiceV1.js";

// import { fetchCloudConfig } from './../checkConfig'

export default class bpApiRouter extends bpBaseRouter {
  constructor() {
    super();

    this.router.use(bodyparser.urlencoded({ extended: true }));
    this.router.use(bodyparser.json());
  }

  initializeRoutes() {
    // initialize handlers
    // this is for GET handlers
    this.getRequestHandlers.push({
      path: "/applications/summary/v1/:encryptedTaxId",
      handler: [
        userProfileMiddlewareV2,
        this.getIncomingBusinessSummary.bind(this),
      ],
    });
    this.getRequestHandlers.push({
      path: "/applications/summary/v1/:encryptedTaxId/filters",
      handler: [
        userProfileMiddlewareV2,
        this.getIncomingBusinessSummaryFilters.bind(this),
      ],
    });
    this.getRequestHandlers.push({
      path: "/applications/summary/v1/:encryptedTaxId/count",
      handler: [userProfileMiddlewareV2, this.getCountOfDocuments.bind(this)],
    });
    //commenting below routes as they are unused
    // this.getRequestHandlers.push({ path: "/applications/enrollment/medicare/v1/:encryptedTaxId/", handler: [userProfileMiddleware, this.getEnrollmentApplications.bind(this)] });

    // this.getRequestHandlers.push({ path: "/applications/stats/medicare/v1/:encryptedTaxId", handler: [userProfileMiddleware, this.getMedicareAppsStats.bind(this)] });
    // this.getRequestHandlers.push({ path: "/applications/stats/smallgroup/v1/:encryptedTaxId", handler: [userProfileMiddleware, this.getSmallGroupAppsStats.bind(this)] });

    // this.getRequestHandlers.push({ path: "/applications/summary/smallgroup/v1/:encryptedTaxId", handler: [userProfileMiddleware, this.getSmallGroupApplications.bind(this)] });

    this.getRequestHandlers.push({
      path: "/applications/stats/v1/:encryptedTaxId",
      handler: [
        userProfileMiddlewareV2,
        lineOfBusinessMiddleware,
        this.getApplicationStats.bind(this),
      ],
    });
    this.getRequestHandlers.push({
      path: "/applications/summary/v2/:encryptedTaxId",
      handler: [
        userProfileMiddlewareV2,
        lineOfBusinessMiddleware,
        this.getIncomingBusinessSummaryV2.bind(this),
      ],
    });
    this.getRequestHandlers.push({
      path: "/applications/summary/v2/:encryptedTaxId/filters",
      handler: [
        userProfileMiddlewareV2,
        lineOfBusinessMiddleware,
        this.getIncomingBusinessSummaryFiltersV2.bind(this),
      ],
    });
    this.getRequestHandlers.push({
      path: "/applications/detail/v1/:encryptedTaxId",
      handler: [
        userProfileMiddlewareV2,
        lineOfBusinessMiddleware,
        this.getApplicationDetails.bind(this),
      ],
    });

    this.getRequestHandlers.push({
      path: '/applications/agents/v1/:encryptedTaxId/:appId',
      handler: [producerInfoMiddleware, this.getAgentOfRecordV1.bind(this)]
    });

    this.getRequestHandlers.push({
      path: "/applications/summary/v2/:encryptedTaxId/filters/group",
      handler: [
        userProfileMiddlewareV2,
        lineOfBusinessMiddleware,
        this.getIncomingBusinessSummaryFiltersGroupV2.bind(this),
      ],
    });
  }

  getAgentOfRecordV1(req, res, next) {
    const agentOfRecordSvc = new AgentOfRecordServiceV1(req);
    agentOfRecordSvc
      .getAgentOfRecord(req.params.encryptedTaxId, req.params.appId, req.session)
      .then(data => {
        res.json(data);
        return data;
      })
      .catch(error => {
        res.status(error.statusCode || 500).json(error);
        return error;
      })
  }

  getIncomingBusinessSummary(req, res, next) {
    const paramsObj = Object.assign(
      {},
      { path: req.params, search: req.query, headers: req.headers }
    );
    const incomingBusinessService = new IncomingBusinessService(req);
    incomingBusinessService
      .getIncomingBusinessSummary(paramsObj, req.session)
      .then((data) => {
        res.json(data);
        return data;
      })
      .catch((error) => {
        res.status(error.statusCode || 500).json(error);
        return error;
      });
  }

  getIncomingBusinessSummaryV2(req, res, next) {
    const paramsObj = Object.assign(
      {},
      { path: req.params, search: req.query, headers: req.headers }
    );
    const incomingBusinessServiceV2 = new IncomingBusinessServiceV2(req);

    incomingBusinessServiceV2
      .getIncomingBusinessSummary(paramsObj, req.session)
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.status(error.statusCode || 500).json(error);
      });
  }

  getApplicationStats(req, res, next) {
    const paramsObj = Object.assign(
      {},
      { path: req.params, search: req.query, headers: req.headers }
    );
    const appStatsService = new AppsStatsService(req);
    appStatsService
      .getCount(paramsObj, req.session)
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.status(error.statusCode || 500).json(error);
      });
  }

  getApplicationDetails(req, res, next) {
    const paramsObj = Object.assign(
      {},
      { path: req.params, search: req.query, headers: req.headers }
    );
    const applicationDetailsServiceV2 = new ApplicationDetailsServiceV2(req);
    applicationDetailsServiceV2
      .getApplicationDetails(paramsObj, req.session)
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.status(error.statusCode || 500).json(error);
      });
  }

  getIncomingBusinessSummaryFilters(req, res, next) {
    const paramsObj = Object.assign(
      {},
      { path: req.params, search: req.query, headers: req.headers }
    );
    const incomingBusinessService = new IncomingBusinessService(req);
    incomingBusinessService
      .getIncomingBusinessSummaryFilters(paramsObj, req.session)
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.status(error.statusCode || 500).json(error);
      });
  }

  getIncomingBusinessSummaryFiltersV2(req, res, next) {
    const paramsObj = Object.assign(
      {},
      { path: req.params, search: req.query, headers: req.headers }
    );

    const incomingBusinessServiceV2 = new IncomingBusinessServiceV2(req);
    incomingBusinessServiceV2
      .getIncomingBusinessSummaryFilters(paramsObj, req.session)
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.status(error.statusCode || 500).json(error);
      });
  }

  getIncomingBusinessSummaryFiltersGroupV2(req, res, next) {
    const paramsObj = { path: req.params, search: req.query, headers: req.headers };


    const incomingBusinessServiceV2 = new IncomingBusinessServiceV2(req);
    incomingBusinessServiceV2
      .getIncomingBusinessSummaryFiltersGroup(paramsObj, req.session)
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.status(error.statusCode || 500).json(error);
      });
  }


  getCountOfDocuments(req, res, next) {
    const paramsObj = Object.assign(
      {},
      { path: req.params, search: req.query, headers: req.headers }
    );
    const incomingBusinessService = new IncomingBusinessService(req);
    incomingBusinessService
      .getCountOfDocuments(paramsObj, req.session)
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.status(error.statusCode || 500).json(error);
      });
  }
}
