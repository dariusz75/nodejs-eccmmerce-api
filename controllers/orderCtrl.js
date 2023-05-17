import expressAsyncHandler from 'express-async-handler';
import Order from '../models/Order.js';
import User from '../models/User.js';

// @desc    Create order
// @route   POST /api/v1/orders
// @access  Private
export const createOrderCtrl = expressAsyncHandler(async (req, res) => {
	// Get the payload (customer, orderItems, shippingAddress, totalPrice)
	const { orderItems, shippingAddress, totalPrice } = req.body;
	console.log('Payload is: ', { orderItems, shippingAddress, totalPrice });
	// Find the User
	const user = await User.findById(req.userAuthId);

	// Check if order is not empty
	// Create order - save the order into DB
	// Update the product quantity
	// Make a payment - stripe
	// Implement payment webhook
	// Update the user order
});
