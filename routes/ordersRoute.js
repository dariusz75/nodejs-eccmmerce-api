import express from 'express';

import {
	createOrderCtrl,
	getOrderStatsCtrl,
} from '../controllers/orderCtrl.js';
import isLoggedIn from '../middlewares/isLoggedIn.js';

const ordersRoute = express.Router();

ordersRoute.post('/', isLoggedIn, createOrderCtrl);
ordersRoute.get('/sales/stats', isLoggedIn, getOrderStatsCtrl);
export default ordersRoute;
