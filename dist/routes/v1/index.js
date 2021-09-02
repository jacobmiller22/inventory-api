"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const v1Router = (0, express_1.Router)();
v1Router.route("/").get(require("./root/test"));
module.exports = v1Router;
//# sourceMappingURL=index.js.map