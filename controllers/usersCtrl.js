import bcrypt from 'bcryptjs';

import User from '../models/User.js';

// #####################################
// @desc    Register User
// @route   POST /api/v1/users/register
// @access  Private/Admin
// #####################################

export const registerUserCtrl = async (req, res) => {
	const { fullname, email, password } = req.body;
	// check if user exists
	const userExists = await User.findOne({ email });
	if (userExists) {
		return res.json({
			msg: 'User already exists',
		});
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
};

// #####################################
// @desc    Login User
// @route   POST /api/v1/users/login
// @access  Public
// #####################################

export const loginUserCtrl = async (req, res) => {
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
		});
	} else {
		res.json({
			msg: 'Invalid login details',
		});
	}
};
