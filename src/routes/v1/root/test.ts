import { Request, Response } from "express";
import { GraphGenController } from "../../../controllers/index";

module.exports = async (req: Request, res: Response) => {
  const element = await GraphGenController();

  res.setHeader("Content-Type", "text/html");
  res.status(200).end(`${element}`);
};
