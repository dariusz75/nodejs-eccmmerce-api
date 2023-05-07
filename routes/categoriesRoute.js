import express from 'express';
import { createCategoryCtrl } from '../controllers/categoriesCtrl.js';
import isLoggedIn from '../middlewares/isLoggedIn.js';

const categoriesRoute = express.Router();

categoriesRoute.post('/', isLoggedIn, createCategoryCtrl);

export default categoriesRoute;
