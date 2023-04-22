export const globalErrorHandler = (err, req, res, next) => {
	const stack = err && err.stack;
	const statusCode = err && err.statusCode ? err.statusCode : 500;
	const message = err && err.message;

	res.status(statusCode).json({
		stack,
		message,
	});
};

// 404 handler
export const notFound = (req, res, next) => {
	const err = new Error(`Route ${req.originalUrl} not found`);
	next(err);
};
