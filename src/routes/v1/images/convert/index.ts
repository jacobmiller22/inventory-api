/**
 *
 * The entry point to the route: 'server/v1/images/convert/
 *
 */
import { IMAGE_DB_OUTGOING } from '../../../../consts';
import { Request, Response, Router } from 'express';
import { ImageController } from '../../../../controllers';
// import { TItemType } from '../../../../interfaces/Inventory';

import { getJsonParser } from '../../../parsers';

let router = Router();

router.post('/', async (req: Request, res: Response) => {
  /** upplad images with the desired mimetype and recieve a list of file paths */

  console.log('test1');

  // Get the path to the source image
  const path = await ImageController().getImageFromReq(req);

  console.log(path);

  const jpgPaths: string[] = await ImageController().getJpgs([path]);

  console.log(jpgPaths);
  if (jpgPaths == null || jpgPaths.length === 0) {
    return res.status(500).end();
  }
  return res.status(200).json(jpgPaths);
});

router.get('/:name', async (req: Request, res: Response) => {
  const name = req.params.name;
  return res.download(`${IMAGE_DB_OUTGOING}/${name}`, name, (err) => {
    if (err) {
      return res.status(500).end('An error occurred whilist downloading the file\n' + err);
    }
  });
});

module.exports = router;
