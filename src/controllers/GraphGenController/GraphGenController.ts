import * as d3 from "d3";
import { JSDOM } from "jsdom";
import _ from "lodash";

import { promises as fs } from "fs";

const GraphGenController = async () => {
  const buf: string = await fs.readFile(`./src/db/daily.json`, "utf-8");
  const historicalCases = JSON.parse(buf);

  const { document } = new JSDOM("").window;
  global.document = document;

  const body = d3.select(document).select("body");

  const svg = body.append("svg");

  const WIDTH = 1000;
  const HEIGHT = 500;
  const MAX = 300000;
  const h = WIDTH / historicalCases.length; // Delta T

  const draw = (ctx: any): any => {
    ctx.moveTo(
      0,
      HEIGHT - (historicalCases[0].positiveIncrease / MAX) * HEIGHT
    );
    _.map(historicalCases, (histCase: any, i: number) => {
      ctx.lineTo(i * h, HEIGHT - (histCase.positiveIncrease / MAX) * HEIGHT);
    });
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

  // await fs.writeFile("test.json", JSON.stringify(historicalCases));
  // @ts-expect-error
  return body.node().innerHTML;
};

export default GraphGenController;
