import express from 'express';
import upload from '../config/fileUpload.js';
import {
	createProductCtrl,
	getProductsCtrl,
	getSingleProductCtrl,
	updateProductCtrl,
	deleteProductCtrl,
} from '../controllers/productCtrl.js';
import isLoggedIn from '../middlewares/isLoggedIn.js';

const productsRoute = express.Router();

productsRoute.post('/', isLoggedIn, upload.single('file'), createProductCtrl);
productsRoute.get('/', getProductsCtrl);
productsRoute.get('/:id', getSingleProductCtrl);
productsRoute.put('/:id/update', isLoggedIn, updateProductCtrl);
productsRoute.delete('/:id/delete', isLoggedIn, deleteProductCtrl);

export default productsRoute;
