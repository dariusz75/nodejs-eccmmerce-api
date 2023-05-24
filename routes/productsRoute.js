import express from 'express';
import upload from '../config/fileUpload.js';
import {
	createProductCtrl,
	getProductsCtrl,
	getSingleProductCtrl,
	updateProductCtrl,
	deleteProductCtrl,
} from '../controllers/productCtrl.js';
import isAdmin from '../middlewares/isAdmin.js';
import isLoggedIn from '../middlewares/isLoggedIn.js';

const productsRoute = express.Router();

productsRoute.post('/', isLoggedIn, upload.array('files'), createProductCtrl);
productsRoute.get('/', getProductsCtrl);
productsRoute.get('/:id', getSingleProductCtrl);
productsRoute.put('/:id', isLoggedIn, isAdmin, updateProductCtrl);
productsRoute.delete('/:id/delete', isLoggedIn, isAdmin, deleteProductCtrl);
export default productsRoute;
