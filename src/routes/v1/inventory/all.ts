import { Request, Response } from "express";
import { DataController } from "../../../controllers/index";
import { EHttpMethod } from "../../../interfaces/http";
import { IInventoryItem } from "../../../interfaces/Inventory";

module.exports = async (req: Request, res: Response) => {
  res.setHeader("Content-Type", "application/json");
  switch (req.method as EHttpMethod) {
    case EHttpMethod.GET:
      res.setHeader("Content-Type", "application/json");
      const all_string = await DataController().getEntireInventory();
      if (all_string == null) {
        return res.status(500).end();
      }
      return res.status(200).end(all_string);

    case EHttpMethod.POST:
      const new_item: IInventoryItem = req.body;
      const _ = await DataController().createInventoryItem(new_item);
      return res.status(201).json();
    case EHttpMethod.PUT:
      return;
    default:
      return res.status(404).json();
  }

  res.status(200).json();
};
