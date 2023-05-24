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
		name: name.toLowerCase(),
		user: req.userAuthId,
		image: req.file.path,
	});
	// Push the product into category
	res.json({
		status: 'success',
		message: 'Category created successfully',
		category,
	});
});

// @desc    Get all categories
// @route   GET /api/v1/categories
// @access  Public
export const getAllCategoriesCtrl = expressAsyncHandler(async (req, res) => {
	let categories = await Category.find();

	res.json({
		status: 'success',
		message: 'Categories fetched successfully',
		categories,
	});
});

// @desc    Get single category
// @route   GET /api/v1/categories/:id
// @access  Public
export const getSingleCategoryCtrl = expressAsyncHandler(async (req, res) => {
	const category = await Category.findById(req.params.id);

	if (!category) {
		throw new Error('Category not found');
	} else {
		res.json({
			status: 'success',
			message: 'Category fetched successfully',
			category,
		});
	}
});

// @desc    Update category
// @route   PUT /api/v1/categories/:id
// @access  Private/Admin
export const updateCategoryCtrl = expressAsyncHandler(async (req, res) => {
	const { name } = req.body;
	console.log('req params', req.params);
	// update
	const category = await Category.findByIdAndUpdate(
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
		message: 'Category updated successfully',
		category,
	});
});

// @desc    Delete category
// @route   DEL /api/v1/categories/:id/delete
// @access  Private/Admin
export const deleteCategoryCtrl = expressAsyncHandler(async (req, res) => {
	// update
	const category = await Category.findByIdAndDelete(req.params.id);

	res.json({
		status: 'success',
		message: 'Category deleted successfully',
	});
});
