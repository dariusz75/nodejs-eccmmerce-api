import asyncHandler from 'express-async-handler';
import dotenv from 'dotenv';
dotenv.config();
import Stripe from 'stripe';
import Order from '../models/Order.js';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Coupon from '../models/Coupon.js';

//stripe instance
const stripe = new Stripe(process.env.STRIPE_KEY);

// @desc    Create order
// @route   POST /api/v1/orders
// @access  Private
export const createOrderCtrl = asyncHandler(async (req, res) => {
	// get discount coupon
	const { coupon } = req?.query;
	const couponFound = await Coupon.findOne({
		code: coupon?.toUpperCase(),
	});

	if (couponFound?.isExpired) {
		throw new Error('Coupon has expired');
	}

	if (!couponFound?.isExpired) {
		throw new Error('Coupon does not exist');
	}

	//get discount
	const discount = couponFound?.discount / 100;

	//Get the payload(customer, orderItems, shipppingAddress, totalPrice);
	const { orderItems, shippingAddress, totalPrice } = req.body;
	//Find the user
	const user = await User.findById(req.userAuthId);
	//Check if user has shipping address
	if (!user?.hasShippingAddress) {
		throw new Error('Please provide shipping address');
	}
	//Check if order is not empty
	if (orderItems?.length <= 0) {
		throw new Error('No Order Items');
	}
	//Place/create order - save into DB
	const order = await Order.create({
		user: user?._id,
		orderItems,
		shippingAddress,
		// totalPrice: couponFound ? totalPrice - totalPrice * discount : totalPrice,
		totalPrice: couponFound ? totalPrice - totalPrice * discount : totalPrice,
	});

	//Update the product qty
	const products = await Product.find({ _id: { $in: orderItems } });

	orderItems?.map(async (order) => {
		const product = products?.find((product) => {
			return product?._id?.toString() === order?._id?.toString();
		});
		if (product) {
			product.totalSold += order.quantity;
			console.log('orderRRRR is', order);
		}
		await product.save();
	});
	//push order into user
	user.orders.push(order?._id);
	await user.save();

	// Make a payment - stripe
	//convert order items to have same structure that stripe need
	const convertedOrders = orderItems.map((item) => {
		return {
			price_data: {
				currency: 'usd',
				product_data: {
					name: item?.name,
					description: item?.description,
				},
				unit_amount: item?.price * 100,
			},
			quantity: item?.quantity,
		};
	});

	const session = await stripe.checkout.sessions.create({
		line_items: convertedOrders,
		metadata: {
			orderId: JSON.stringify(order?._id),
		},
		mode: 'payment',
		success_url: 'http://localhost:3000/success',
		cancel_url: 'http://localhost:3000/cancel',
	});
	res.send({ url: session.url });

	// Implement payment webhook
	// Update the user order
	// res.json({
	// 	success: true,
	// 	message: 'Order created',
	// 	order,
	// 	user,
	// });
});
