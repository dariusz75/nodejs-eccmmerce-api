import expressAsyncHandler from 'express-async-handler';
import Order from '../models/Order.js';
import User from '../models/User.js';
import Product from '../models/Product.js';

// @desc    Create order
// @route   POST /api/v1/orders
// @access  Private
export const createOrderCtrl = expressAsyncHandler(async (req, res) => {
	// Get the payload (customer, orderItems, shippingAddress, totalPrice)
	const { orderItems, shippingAddress, totalPrice } = req.body;
	// Find the User
	const user = await User.findById(req.userAuthId);
	// Check if order is not empty
	if (orderItems?.length <= 0) {
		throw new Error('No order items');
	}
	// Create order - save the order into DB
	const order = await Order.create({
		user: user?.id,
		orderItems,
		shippingAddress,
		totalPrice,
	});
	// Push order int User
	user.orders.push(order?._id);
	await user.save();
	// Update the product quantity
	const products = await Product.find({ _id: { $in: orderItems } });
	orderItems?.map(async (order) => {
		const product = products?.find((product) => {
			return product._id?.toString() === order._id?.toString();
		});
		if (product) {
			product.totalSold += order.totalQtyBuying;
		}
		await product.save();
	});
	// Make a payment - stripe
	// Implement payment webhook
	// Update the user order
	res.json({
		success: true,
		message: 'Order created',
		order,
		user,
	});
});
