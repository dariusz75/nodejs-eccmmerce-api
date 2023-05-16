import express from 'express';

import { createOrderCtrl } from '../controllers/orderCtrl.js';
import isLoggedIn from '../middlewares/isLoggedIn.js';

const ordersRoute = express.Router();

ordersRoute.post('/', isLoggedIn, createOrderCtrl);

export default ordersRoute;
