/**
 *
 * The entry point to the route: 'server/v1/inventory/
 *
 */
import { Router, Request, Response } from 'express';
import { DataController } from '../../../controllers/index';

import { IInventoryItemMap } from '../../../interfaces/Inventory';

let router = Router();

/** Further nested routes */

router.use('/item', require('./item'));
router.use('/locations', require('./locations'));
router.use('/types', require('./types'));

/**
 * @api {get} /v1/inventory/ Get the inventory
 */
router.get('/', async (req: Request, res: Response) => {

  /** Get all inventory items */
  res.setHeader('Content-Type', 'application/json');
  const all: IInventoryItemMap = await DataController().getInventory();
  if (all == null) {
    return res.status(500).end();
  }
  return res.status(200).json(all);
});

module.exports = router;
