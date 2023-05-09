import express from 'express';
import {
	createReviewCtrl,
	getAllReviewsCtrl,
} from '../controllers/reviewsCtrl.js';
import isLoggedIn from '../middlewares/isLoggedIn.js';

const reviewsRoute = express.Router();

reviewsRoute.post('/:productId', isLoggedIn, createReviewCtrl);
reviewsRoute.get('/', getAllReviewsCtrl);

export default reviewsRoute;
