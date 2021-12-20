/**
 *
 * This is the entry point to the router for the API.
 *
 */

import { Application } from 'express';

module.exports = (app: Application) => {
  app.use('/v1', require('./v1'));
};
