/**
 *
 * The entry point to the route: 'server/v1/inventory/types/
 *
 */
import { Request, Response, Router } from 'express';
import { DataController } from '../../../../controllers/index';
import { TItemType } from '../../../../interfaces/Inventory';

import { getJsonParser } from '../../../parsers';

let router = Router();

router.get('/', async (req: Request, res: Response) => {
  /** Get all types */
  res.setHeader('Content-Type', 'application/json');
  const all: TItemType[] = await DataController().getTypes();
  if (all == null) {
    return res.status(500).end();
  }
  return res.status(200).json(all);
});

module.exports = router;
