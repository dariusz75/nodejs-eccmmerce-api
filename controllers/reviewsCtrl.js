import expressAsyncHandler from 'express-async-handler';
import Review from '../models/Review.js';

// @desc    Create new Review
// @route   POST /api/v1/brands
// @access  Private/Admin
export const createBrandCtrl = expressAsyncHandler(async (req, res) => {
	const { name, user, products } = req.body;

	// Check if Brand already exists
	const brandExists = await Brand.findOne({ name });
	if (brandExists) {
		throw new Error('Brand already exists');
	}
	// Create new Brand
	const brand = await Brand.create({
		name: name.toLowerCase(),
		user: req.userAuthId,
	});
	// Push the Brand into category
	res.json({
		status: 'success',
		message: 'Brand created successfully',
		brand,
	});
});
