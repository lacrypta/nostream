import express from 'express'

import { Router, json } from 'express'

import callbacksRouter from './callbacks'
import { getHealthRequestHandler } from '../handlers/request-handlers/get-health-request-handler'
import { getTermsRequestHandler } from '../handlers/request-handlers/get-terms-request-handler'
import invoiceRouter from './invoices'
import { rateLimiterMiddleware } from '../handlers/request-handlers/rate-limiter-middleware'
import { rootRequestHandler } from '../handlers/request-handlers/root-request-handler'

const router = express.Router()

router.get('/', rootRequestHandler)
router.get('/healthz', getHealthRequestHandler)
router.get('/terms', getTermsRequestHandler)

router.use('/invoices', rateLimiterMiddleware, invoiceRouter)
router.use('/callbacks', rateLimiterMiddleware, callbacksRouter)

const pluginRouter = Router();
pluginRouter.get('/', json(), (req, res) => {
  res.status(200).send("hello");
  return;
});

router.use('/plugin', rateLimiterMiddleware, pluginRouter);

export default router
