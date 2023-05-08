import expressAsyncHandler from 'express-async-handler';
import Brand from '../models/Brand.js';

// @desc    Create new Brand
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

// @desc    Get all Brands
// @route   GET /api/v1/brands
// @access  Public
export const getAllBrandsCtrl = expressAsyncHandler(async (req, res) => {
	let brands = await Brand.find();

	res.json({
		status: 'success',
		message: 'Brands fetched successfully',
		brands,
	});
});

// @desc    Get single Brand
// @route   GET /api/v1/brands/:id
// @access  Public
export const getSingleBrandCtrl = expressAsyncHandler(async (req, res) => {
	const brand = await Brand.findById(req.params.id);

	if (!brand) {
		throw new Error('Brand not found');
	} else {
		res.json({
			status: 'success',
			message: 'Brand fetched successfully',
			brand,
		});
	}
});

// @desc    Update Brand
// @route   PUT /api/v1/brands/:id
// @access  Private/Admin
export const updateBrandCtrl = expressAsyncHandler(async (req, res) => {
	const { name } = req.body;
	// update
	const brand = await Brand.findByIdAndUpdate(
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
		message: 'Brand updated successfully',
		brand,
	});
});

// @desc    Delete Brand
// @route   DEL /api/v1/brands/:id/delete
// @access  Private/Admin
export const deleteBrandCtrl = expressAsyncHandler(async (req, res) => {
	// update
	const brand = await Brand.findByIdAndDelete(req.params.id);

	res.json({
		status: 'success',
		message: 'Brand deleted successfully',
	});
});
