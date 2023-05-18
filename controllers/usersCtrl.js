import User from '../models/User.js';

import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import getTokenFromHeader from '../utils/getTokenFromHeader.js';
import verifyToken from '../utils/verifyToken.js';

// @desc    Register User
// @route   POST /api/v1/users/register
// @access  Private/Admin
export const registerUserCtrl = asyncHandler(async (req, res) => {
	const { fullname, email, password } = req.body;
	// check if user exists
	const userExists = await User.findOne({ email });
	if (userExists) {
		throw new Error('User already exists');
	}

	// hash user password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	// create user
	const user = await User.create({
		fullname,
		email,
		password: hashedPassword,
	});

	res.status(201).json({
		status: 'success',
		message: 'User registered successfully',
		data: user,
	});
});

// @desc    Login User
// @route   POST /api/v1/users/login
// @access  Public
export const loginUserCtrl = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	// find a user in database
	const userFound = await User.findOne({
		email,
	});

	if (
		userFound &&
		(await bcrypt.compare(password, userFound && userFound.password))
	) {
		res.json({
			status: 'success',
			message: 'User logged in successfully',
			userFound,
			token: generateToken(userFound.id),
		});
	} else {
		throw new Error('Invalid login details');
	}
});

// @desc    Get User profile
// @route   POST /api/v1/users/profile
// @access  Private
export const getUserProfileCtrl = asyncHandler(async (req, res) => {
	const token = getTokenFromHeader(req);
	const verified = verifyToken(token);
	console.log('veryfied token is', verified);

	console.log(token);
	res.json({
		msg: 'Welcome to Profile Page',
	});
});

// @desc    Update User shipping address
// @route   POST /api/v1/users/update/shipping
// @access  Private

export const updateShippingAddressCtrl = asyncHandler(async (req, res) => {
	const {
		firstName,
		lastName,
		address,
		city,
		postalCode,
		province,
		country,
		phone,
	} = req.body;
	const user = await User.findByIdAndUpdate(
		req.userAuthId,
		{
			shippingAddress: {
				firstName,
				lastName,
				address,
				city,
				postalCode,
				province,
				country,
				phone,
			},
			hasShippingAddress: true,
		},
		{
			new: true,
		}
	);
	res.json({
		status: 'success',
		message: 'Shipping address updated successfully',
		user,
	});
});
