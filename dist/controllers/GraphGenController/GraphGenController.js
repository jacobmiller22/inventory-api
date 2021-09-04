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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const d3 = __importStar(require("d3"));
const jsdom_1 = require("jsdom");
const lodash_1 = __importDefault(require("lodash"));
const fs_1 = require("fs");
// import path from "path";
// interface IAXISVAR {}
const GraphGenController = () => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(path.basename());
    const buf = yield fs_1.promises.readFile(`./src/db/daily.json`, "utf-8");
    const historicalCases = JSON.parse(buf);
    const { document } = new jsdom_1.JSDOM("").window;
    global.document = document;
    const body = d3.select(document).select("body");
    const svg = body.append("svg");
    // const dateToAxisVar = (date: number): number => {
    //   let strDate: string = `${date}`;
    //   return (
    //     new Date(
    //       parseInt(strDate.slice(0, 4)),
    //       parseInt(strDate.slice(4, 6)) - 1,
    //       parseInt(strDate.slice(6, 8))
    //     ).getTime() / 100000
    //   );
    // };
    const WIDTH = 1000;
    const HEIGHT = 500;
    const MAX = 300000;
    const h = WIDTH / historicalCases.length;
    // let max = 0;
    const draw = (ctx) => {
        ctx.moveTo(0, HEIGHT - (historicalCases[0].positiveIncrease / MAX) * HEIGHT);
        lodash_1.default.map(historicalCases, (histCase, i) => {
            // max = Math.max(max, histCase.positive);
            // console.log(histCase.positiveIncrease);
            ctx.lineTo(i * h, HEIGHT - (histCase.positiveIncrease / MAX) * HEIGHT);
        });
        // ctx.lineTo(50, 50);
        // console.log("max:", max);
        return ctx;
    };
    // Prep SVG
    svg
        .style("stroke", "black")
        .style("fill", "none")
        .style("stroke-width", "1px")
        .attr("width", WIDTH)
        .attr("height", HEIGHT);
    svg.append("path").attr("d", draw(d3.path()));
    // historicalCases.reverse();
    // await fs.writeFile("test.json", JSON.stringify(historicalCases));
    // @ts-expect-error
    return body.node().innerHTML;
});
exports.default = GraphGenController;
//# sourceMappingURL=GraphGenController.js.map