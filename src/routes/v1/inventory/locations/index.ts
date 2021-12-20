/**
 *
 * The entry point to the route: 'server/v1/inventory/types/
 *
 */
import { Request, Response, Application, Router } from 'express';
import { DataController } from '../../../../controllers/index';
import { IInventoryLocation, IInventoryLocationMap, TLocationID } from '../../../../interfaces/Inventory';

import { getJsonParser } from '../../../parsers';

let router = Router();

router.get('/', async (req: Request, res: Response) => {
  /** Get all locations */
  res.setHeader('Content-Type', 'application/json');
  const all: IInventoryLocationMap = await DataController().getLocations();
  if (all == null) {
    return res.status(400).end();
  }
  return res.status(200).json(all);
});

router.post('/', getJsonParser(), async (req: Request, res: Response) => {
  /** Add a new location */
  const location: IInventoryLocation = req.body.location;
  if (location == null) {
    return res.status(400).end();
  }
  const result: TLocationID = await DataController().createInventoryLocation(location);
  if (result == null) {
    return res.status(500).end();
  }
  return res.status(200).json(result);
});

router.put('/', getJsonParser(), async (req: Request, res: Response) => {});

module.exports = router;
