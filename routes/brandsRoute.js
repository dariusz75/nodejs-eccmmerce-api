import express from 'express';
import {
	createBrandCtrl,
	getAllBrandsCtrl,
	getSingleBrandCtrl,
	updateBrandCtrl,
	deleteBrandCtrl,
} from '../controllers/brandsCtrl.js';
import isLoggedIn from '../middlewares/isLoggedIn.js';

const brandsRoute = express.Router();

brandsRoute.post('/', isLoggedIn, createBrandCtrl);
brandsRoute.get('/', getAllBrandsCtrl);
brandsRoute.get('/:id', getSingleBrandCtrl);
brandsRoute.put('/:id/update', isLoggedIn, updateBrandCtrl);
brandsRoute.delete('/:id/delete', isLoggedIn, deleteBrandCtrl);

export default brandsRoute;
