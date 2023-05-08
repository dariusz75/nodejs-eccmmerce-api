import expressAsyncHandler from 'express-async-handler';
import Color from '../models/Color.js';

// @desc    Create new Color
// @route   POST /api/v1/colors
// @access  Private/Admin
export const createColorCtrl = expressAsyncHandler(async (req, res) => {
	const { name, user, products } = req.body;

	// Check if Color already exists
	const colorExists = await Color.findOne({ name });
	if (colorExists) {
		throw new Error('Color already exists');
	}
	// Create new Color
	const color = await Color.create({
		name: name.toLowerCase(),
		user: req.userAuthId,
	});
	// Push the Color into category
	res.json({
		status: 'success',
		message: 'Color created successfully',
		color,
	});
});

// @desc    Get all Colors
// @route   GET /api/v1/colors
// @access  Public
export const getAllColorsCtrl = expressAsyncHandler(async (req, res) => {
	let colors = await Color.find();

	res.json({
		status: 'success',
		message: 'Colors fetched successfully',
		colors,
	});
});

// @desc    Get single Color
// @route   GET /api/v1/colors/:id
// @access  Public
export const getSingleColorCtrl = expressAsyncHandler(async (req, res) => {
	const color = await Color.findById(req.params.id);

	if (!color) {
		throw new Error('Color not found');
	} else {
		res.json({
			status: 'success',
			message: 'Color fetched successfully',
			color,
		});
	}
});

// @desc    Update Color
// @route   PUT /api/v1/colors/:id
// @access  Private/Admin
export const updateColorCtrl = expressAsyncHandler(async (req, res) => {
	const { name } = req.body;
	// update
	const color = await Color.findByIdAndUpdate(
		req.params.id,
		{
			name,
		},
		{
			new: true,
		}
	);

	res.json({
		status: 'success',
		message: 'Color updated successfully',
		color,
	});
});

// @desc    Delete Color
// @route   DEL /api/v1/colors/:id/delete
// @access  Private/Admin
export const deleteColorCtrl = expressAsyncHandler(async (req, res) => {
	// update
	const color = await Color.findByIdAndDelete(req.params.id);

	res.json({
		status: 'success',
		message: 'Color deleted successfully',
	});
});
