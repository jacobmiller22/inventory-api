import { Request, Response } from 'express';
import { DataController } from '../../../controllers/index';
import { EHttpMethod } from '../../../interfaces/http';
import { IInventoryItem, IInventoryItemMap } from '../../../interfaces/Inventory';

module.exports = async (req: Request, res: Response) => {
  switch (req.method as EHttpMethod) {
    case EHttpMethod.GET:
      /** Get all inventory items */
      res.setHeader('Content-Type', 'application/json');
      const all: IInventoryItemMap = await DataController().getInventory();
      if (all == null) {
        return res.status(500).end();
      }
      return res.status(200).json(all);

    case EHttpMethod.POST:
      /** Create a new Item */

      const new_item: IInventoryItem = req.body;

      const inventory_id = await DataController().createInventoryItem(new_item);

      if (inventory_id == null) {
        return res.status(400).end('Item already exists');
      }

      return res.status(201).end();
    case EHttpMethod.PUT:
      /** Update an inventory item */
      return;
    default:
      console.log('default');
      return res.status(404).json();
  }

  res.status(200).json();
};
