/** Set up body parser */
var bodyParser = require('body-parser');

// create application/json parser
var jsonParser = bodyParser.json();

export const getJsonParser = () => jsonParser;

// create application/x-www-form-urlencoded parser
var urlEncodedParser = bodyParser.urlencoded({ extended: false });

export const getUrlEncodedParser = () => urlEncodedParser;
// export default parsers;
