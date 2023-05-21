import express from 'express';
import {
	createCouponCtrl,
	getAllCouponsCtrl,
	getSingleCouponCtrl,
	updateCouponCtrl,
	deleteCouponCtrl,
} from '../controllers/couponsCtrl.js';
import isLoggedIn from '../middlewares/isLoggedIn.js';

const couponsRouter = express.Router();

couponsRouter.post('/', isLoggedIn, createCouponCtrl);
couponsRouter.get('/', isLoggedIn, getAllCouponsCtrl);
couponsRouter.get('/:id', isLoggedIn, getSingleCouponCtrl);
couponsRouter.put('/:id/update', isLoggedIn, updateCouponCtrl);
couponsRouter.delete('/:id/delete', isLoggedIn, deleteCouponCtrl);

export default couponsRouter;
