// const express = require("express");
import express from 'express';

const app = express();

// define a route handler for the default home page

require('./routes')(app);

const arg_port = process.argv.indexOf('--port') + 1;

const PORT = process.env.PORT || process.argv[arg_port === 0 ? -1 : arg_port] || 8080;

// start the Express server
try {
  app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
  });
} catch (e) {
  console.log('Failed to start server on port ' + PORT);
  console.log(e);
}
