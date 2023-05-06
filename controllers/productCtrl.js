import expressAsyncHandler from 'express-async-handler';
import Product from '../models/Product.js';

// @desc    Create new product
// @route   POST /api/v1/product
// @access  Private/Admin
export const createProductCtrl = expressAsyncHandler(async (req, res) => {
	const {
		name,
		description,
		category,
		sizes,
		colors,
		user,
		images,
		price,
		totalQty,
		brand,
	} = req.body;

	// Check if product already exists
	const productExists = await Product.findOne({ name });
	if (productExists) {
		throw new Error('Product already exists');
	}
	// Create new product
	const product = await Product.create({
		name,
		description,
		category,
		sizes,
		colors,
		user: req.userAuthId,
		images,
		price,
		totalQty,
		brand,
	});
	// Push the product into category
	res.json({
		status: 'success',
		message: 'Product created successfully',
		product,
	});
});

// @desc    Get all products
// @route   POST /api/v1/products
// @access  Public

export const getProductsCtrl = expressAsyncHandler(async (req, res) => {
	let productQuery = Product.find();

	if (req.query.name) {
		productQuery = productQuery.find({
			name: {
				$regex: req.query.name,
				$options: 'i',
			},
		});
	}

	const products = await productQuery;

	res.json({
		status: 'success',
		products,
	});
});
