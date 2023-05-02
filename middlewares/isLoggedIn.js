import getTokenFromHeader from '../utils/getTokenFromHeader.js';
import verifyToken from '../utils/verifyToken.js';

const isLoggedIn = (req, resp, next) => {
	// get token from header
	const token = getTokenFromHeader(req);
	// verify the token
	const decodedUser = verifyToken(token);

	if (!decodedUser) {
		throw new Error('Invalid or expired token, please login again.');
	} else {
		// save the user into req object
		req.userAuthId = decodedUser?.id;
		next();
	}
};

export default isLoggedIn;
