import User from '../models/User.js';

// @desc    Register user
// @route   POST /api/v1/users/register
// @access  Private/Admin

export const registerUserCtrl = async (req, res) => {
	const { fullname, email, password } = req.body;
	// check if user exists
	const userExists = await User.findOne({ email });
	if (userExists) {
		res.json({
			msg: 'User already exists',
		});
	}
	// create user
	const user = await User.create({
		fullname,
		email,
		password,
	});

	res.status(201).json({
		status: 'success',
		message: 'User registered successfully',
		data: user,
	});
};
