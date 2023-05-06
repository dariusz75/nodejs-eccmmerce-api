import express from 'express';
import {
	createProductCtrl,
	getProductsCtrl,
	getSingleProductCtrl,
} from '../controllers/productCtrl.js';
import isLoggedIn from '../middlewares/isLoggedIn.js';

const productsRoute = express.Router();

productsRoute.post('/', isLoggedIn, createProductCtrl);
productsRoute.get('/', getProductsCtrl);
productsRoute.get('/:id', getSingleProductCtrl);

export default productsRoute;
