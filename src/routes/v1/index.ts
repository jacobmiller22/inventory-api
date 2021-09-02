import { Router } from "express";

const v1Router = Router();

v1Router.route("/").get(require("./root/test"));

module.exports = v1Router;
