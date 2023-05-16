import expressAsyncHandler from 'express-async-handler';
import Order from '../models/Order.js';

// @desc    Create order
// @route   POST /api/v1/orders
// @access  Private
export const createOrderCtrl = expressAsyncHandler(async (req, res) => {
	// Find the User
	// Get the payload (customer, orderItems, shippingAddress, totalPrice)
	// Check if order is not empty
	// Create order - save the order into DB
	// Update the product quantity
	// Make a payment - stripe
	// Implement payment webhook
	// Update the user order
});
