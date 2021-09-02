import * as d3 from "d3";
import { JSDOM } from "jsdom";
import { promises as fs } from "fs";

const GraphGenController = async () => {
  const { document } = new JSDOM("").window;
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
  await fs.writeFile("test.svg", body.node().innerHTML);
};

export default GraphGenController;
