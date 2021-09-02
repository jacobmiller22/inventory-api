// const express = require("express");
import express from "express";

const app = express();

// define a route handler for the default home page

require("./routes")(app);

const PORT = process.env.PORT || 8080;
// start the Express server
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
