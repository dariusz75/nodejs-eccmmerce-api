import expressAsyncHandler from 'express-async-handler';
import Coupon from '../models/Coupon.js';

// @desc    Create new Coupon
// @route   POST /api/v1/coupons
// @access  Private/Admin
export const createCouponCtrl = expressAsyncHandler(async (req, res) => {
	const { code, startDate, endDate, discount } = req.body;

	// Check if Coupon already exists
	const couponExists = await Coupon.findOne({ code });
	// check if admin

	// check if Coupon exists
	if (couponExists) {
		throw new Error('Coupon already exists');
	}

	// check if Coupon is a number
	if (isNaN(discount)) {
		throw new Error('Discount value must be a number');
	}

	// Create new Coupon
	const coupon = await Coupon.create({
		code,
		startDate,
		endDate,
		discount,
		user: req.userAuthId,
	});

	res.status(201).json({
		status: 'success',
		message: 'Coupon created successfully',
		coupon,
	});
});
