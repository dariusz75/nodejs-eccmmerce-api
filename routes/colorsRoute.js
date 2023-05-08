import express from 'express';
import {
	createColorCtrl,
	getAllColorsCtrl,
	getSingleColorCtrl,
	updateColorCtrl,
	deleteColorCtrl,
} from '../controllers/colorsCtrl.js';
import isLoggedIn from '../middlewares/isLoggedIn.js';

const colorsRoute = express.Router();

colorsRoute.post('/', isLoggedIn, createColorCtrl);
colorsRoute.get('/', getAllColorsCtrl);
colorsRoute.get('/:id', getSingleColorCtrl);
colorsRoute.put('/:id/update', isLoggedIn, updateColorCtrl);
colorsRoute.delete('/:id/delete', isLoggedIn, deleteColorCtrl);

export default colorsRoute;
