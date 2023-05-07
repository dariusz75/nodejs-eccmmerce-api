import express from 'express';
import {
	createCategoryCtrl,
	getAllCategoriesCtrl,
	getSingleCategoryCtrl,
} from '../controllers/categoriesCtrl.js';
import isLoggedIn from '../middlewares/isLoggedIn.js';

const categoriesRoute = express.Router();

categoriesRoute.post('/', isLoggedIn, createCategoryCtrl);
categoriesRoute.get('/', getAllCategoriesCtrl);
categoriesRoute.get('/:id', getSingleCategoryCtrl);

export default categoriesRoute;
