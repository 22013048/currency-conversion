// Simple rate limiter using Map to store request counts
const requestCounts = new Map();

export const rateLimiter = (windowMs = 15 * 60 * 1000, maxRequests = 100) => {
  return (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    const key = `${ip}:${Math.floor(now / windowMs)}`;

    if (!requestCounts.has(key)) {
      requestCounts.set(key, 0);
    }

    const count = requestCounts.get(key);

    if (count >= maxRequests) {
      return res.status(429).json({
        success: false,
        error: 'Too many requests, please try again later',
      });
    }

    requestCounts.set(key, count + 1);

    // Cleanup old entries
    for (const [k] of requestCounts) {
      if (!k.includes(Math.floor(now / windowMs).toString())) {
        requestCounts.delete(k);
      }
    }

    next();
  };
};
 export default rateLimiter;