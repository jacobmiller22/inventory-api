import { Application } from 'express';

/** Set up body parser */
var bodyParser = require('body-parser');

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = (app: Application) => {
  app.use('/v1', jsonParser, require('./v1'));
};
