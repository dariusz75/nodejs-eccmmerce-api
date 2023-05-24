import express from 'express';

import { createOrderCtrl, getSalesSumCtrl } from '../controllers/orderCtrl.js';
import isLoggedIn from '../middlewares/isLoggedIn.js';

const ordersRoute = express.Router();

ordersRoute.post('/', isLoggedIn, createOrderCtrl);
ordersRoute.get('/sales/sum', isLoggedIn, getSalesSumCtrl);
export default ordersRoute;
