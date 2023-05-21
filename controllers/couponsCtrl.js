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
		code: code?.toUpperCase(),
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

// @desc    Get all Coupons
// @route   GET /api/v1/coupons
// @access  Private/Admin
export const getAllCouponsCtrl = expressAsyncHandler(async (req, res) => {
	const coupons = await Coupon.find();
	res.status(200).json({
		status: 'success',
		message: 'All coupons',
		coupons,
	});
});

// @desc    Get single Coupon
// @route   GET /api/v1/coupons/:id
// @access  Public
export const getSingleCouponCtrl = expressAsyncHandler(async (req, res) => {
	const coupon = await Coupon.findById(req.params.id);
	if (!coupon) {
		throw new Error('Coupon not found');
	} else {
		res.json({
			status: 'success',
			message: 'Coupon fetched successfully',
			coupon,
		});
	}
});

// @desc    Update coupon
// @route   PUT /api/v1/coupons/:id/update
// @access  Private/Admin
export const updateCouponCtrl = expressAsyncHandler(async (req, res) => {
	const { code, startDate, endDate, discount } = req.body;
	// update
	const coupon = await Coupon.findByIdAndUpdate(
		req.params.id,
		{
			code,
			startDate,
			endDate,
			discount,
		},
		{
			new: true,
		}
	);

	res.json({
		status: 'success',
		message: 'Coupon updated successfully',
		coupon,
	});
});

// @desc    Delete Product
// @route   DEL /api/v1/coupons/:id/update
// @access  Private/Admin
export const deleteCouponCtrl = expressAsyncHandler(async (req, res) => {
	// update
	const coupon = await Coupon.findByIdAndDelete(req.params.id);

	res.json({
		status: 'success',
		message: 'Coupon deleted successfully',
	});
});
