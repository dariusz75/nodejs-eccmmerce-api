import express from 'express';
import upload from '../config/fileUpload.js';
import {
	createCategoryCtrl,
	getAllCategoriesCtrl,
	getSingleCategoryCtrl,
	updateCategoryCtrl,
	deleteCategoryCtrl,
} from '../controllers/categoriesCtrl.js';
import isLoggedIn from '../middlewares/isLoggedIn.js';

const categoriesRoute = express.Router();

categoriesRoute.post(
	'/',
	isLoggedIn,
	upload.single('file'),
	createCategoryCtrl
);
categoriesRoute.get('/', getAllCategoriesCtrl);
categoriesRoute.get('/:id', getSingleCategoryCtrl);
categoriesRoute.put('/:id/update', isLoggedIn, updateCategoryCtrl);
categoriesRoute.delete('/:id/delete', isLoggedIn, deleteCategoryCtrl);

export default categoriesRoute;
