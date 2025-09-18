// File: backend/src/middlewares/role.middleware.js
// --------------------------------------------------

import { AppError } from '../utils/AppError.js';

// This is a higher-order function that returns a middleware function.
// It allows us to pass arguments (the roles) to our middleware.
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles is an array, e.g., ['organisation', 'teacher']
    // req.user.role is set by the 'protect' middleware
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }
    next();
  };
};
