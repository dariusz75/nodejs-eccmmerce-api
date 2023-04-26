import jwt from 'jsonwebtoken';

const generateToken = (id) =>
	jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: '3d' });

export default generateToken;
