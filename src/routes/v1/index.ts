import { Router } from 'express';

const v1Router = Router();

v1Router.route('/').get(require('./root/test'));

v1Router.route('/inventory').all(require('./inventory'));
v1Router.route('/inventory/types').all(require('./inventory/types'));
v1Router.route('/inventory/locations').all(require('./inventory/locations'));
// .get(require('./inventory/all'))
// .post(require('./inventory/all'))
// .put(require('./inventory/all'));

module.exports = v1Router;
