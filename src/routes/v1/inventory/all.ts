import { Request, Response } from "express";
// import { GraphGenController } from "../../../controllers/index";
import { EHttpMethod } from "../../../interfaces/http";

module.exports = async (req: Request, res: Response) => {
  // const element = await GraphGenController();

  res.setHeader("Content-Type", "application/json");
  switch (req.method as EHttpMethod) {
    case EHttpMethod.GET:
      return res.status(200).json();
    default:
      return res.status(404).json();
  }

  res.status(200).json();
};
