import expressAsyncHandler from 'express-async-handler';
import Category from '../models/Category.js';

// @desc    Create new category
// @route   POST /api/v1/categories
// @access  Private/Admin
export const createCategoryCtrl = expressAsyncHandler(async (req, res) => {
	const { name, user, image, products } = req.body;

	// Check if category already exists
	const categoryExists = await Category.findOne({ name });
	if (categoryExists) {
		throw new Error('Category already exists');
	}
	// Create new category
	const category = await Category.create({
		name,
		user: req.userAuthId,
	});
	// Push the product into category
	res.json({
		status: 'success',
		message: 'Category created successfully',
		category,
	});
});

// @desc    Get all categories
// @route   POST /api/v1/categories
// @access  Public
export const getCategoryCtrl = expressAsyncHandler(async (req, res) => {
	let categoryQuery = Category.find();

	// filter category by name
	if (req.query.name) {
		productQuery = productQuery.find({
			name: {
				$regex: req.query.name,
				$options: 'i',
			},
		});
	}
	// Push the product into category
	res.json({
		status: 'success',
		message: 'Category created successfully',
		category,
	});
});
