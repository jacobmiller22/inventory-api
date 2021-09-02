"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const d3 = __importStar(require("d3"));
const jsdom_1 = require("jsdom");
const fs_1 = require("fs");
const GraphGenController = () => __awaiter(void 0, void 0, void 0, function* () {
    const { document } = new jsdom_1.JSDOM("").window;
    global.document = document;
    const body = d3.select(document).select("body");
    const svg = body.append("svg").attr("width", 500).attr("height", 500);
    svg
        .append("rect")
        .attr("x", 10)
        .attr("y", 10)
        .attr("width", 80)
        .attr("height", 80)
        .style("fill", "orange");
    // console.log(svg.html());
    // @ts-expect-error
    yield fs_1.promises.writeFile("test.svg", body.node().innerHTML);
});
exports.default = GraphGenController;
//# sourceMappingURL=GraphGenController.js.map