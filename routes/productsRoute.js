import express from 'express';
import {
	createProductCtrl,
	getProductsCtrl,
	getSingleProductCtrl,
	updateProductCtrl,
	deleteProductCtrl,
} from '../controllers/productCtrl.js';
import isLoggedIn from '../middlewares/isLoggedIn.js';

const productsRoute = express.Router();

productsRoute.post('/', isLoggedIn, createProductCtrl);
productsRoute.get('/', getProductsCtrl);
productsRoute.get('/:id', getSingleProductCtrl);
productsRoute.put('/:id/update', isLoggedIn, updateProductCtrl);
productsRoute.delete('/:id/delete', isLoggedIn, deleteProductCtrl);

export default productsRoute;
