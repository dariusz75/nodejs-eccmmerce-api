import expressAsyncHandler from 'express-async-handler';
import Product from '../models/Product.js';
import Review from '../models/Review.js';

// @desc    Create new Review
// @route   POST /api/v1/reviews
// @access  Public
export const createReviewCtrl = expressAsyncHandler(async (req, res) => {
	const { user, product, message, rating } = req.body;

	// Find the product to add the review for
	const { productId } = req.params;
	const productFound = await Product.findById(productId);

	console.log('Product is ', productFound);

	// check if there is a product
	if (!productFound) {
		throw new Error('Product not found');
	}
	// check if user has already reviewed this product

	// Create new Review
	const review = await Review.create({
		message: message,
		rating: rating,
		product: productFound._id,
		user: req.userAuthId,
	});

	// Push the Review into Product
	productFound.reviews.push(review._id);
	productFound.save();

	res.json({
		status: 'success',
		message: 'Review created successfully',
	});
});

// @desc    Get all Reviews
// @route   GET /api/v1/reviews
// @access  Public
export const getAllReviewsCtrl = expressAsyncHandler(async (req, res) => {
	let reviews = await Review.find();

	res.json({
		status: 'success',
		message: 'Reviews fetched successfully',
		reviews,
	});
});
