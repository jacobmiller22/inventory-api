/**
 *
 * The entry point to the route: 'server/v1/
 *
 */

import { Router } from 'express';

let router = Router();

router.use('/inventory', require('./inventory'));

module.exports = router;
