import { Request, Response } from "express";
import { GraphGenController } from "../../../controllers/index";

module.exports = async (req: Request, res: Response) => {
  await GraphGenController();
  res.send("This is a test. Hot restart. fdsf");
};
