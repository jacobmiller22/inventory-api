import { Router } from 'express';

const v1Router = Router();

v1Router.route('/').get(require('./root/test'));

v1Router.route('/inventory/all').all(require('./inventory/all'));
// .get(require('./inventory/all'))
// .post(require('./inventory/all'))
// .put(require('./inventory/all'));

module.exports = v1Router;
