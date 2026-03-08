import rateLimit from 'express-rate-limit';

// Standard rate limiter for API endpoints (e.g., 100 requests per 15 mins)
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: {
    status: 'error',
    message: 'Too many requests from this IP, please try again after 15 minutes',
  },
  standardHeaders: true, 
  legacyHeaders: false, 
});

// Stricter rate limiter for auth routes (e.g., login, register)
export const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, 
  message: {
    status: 'error',
    message: 'Too many login attempts from this IP, please try again after an hour',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
