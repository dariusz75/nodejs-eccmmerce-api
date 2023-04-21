import User from '../models/User.js';

// @desc    Register user
// @route   POST /api/v1/users/register
// @access  Private/Admin

export const registerUserCtrl = async (reg, res) => {
	res.json({
		msg: 'User register controller',
	});
};
