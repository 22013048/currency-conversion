export const validate = {
  convertQuery: (req, res, next) => {
    const { from, to, amount } = req.query;

    if (!from || !to || !amount) {
      return res.status(400).json({
        success: false,
        error: 'Missing required query parameters: from, to, amount',
      });
    }

    if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Amount must be a positive number',
      });
    }

    if (from.length !== 3 || to.length !== 3) {
      return res.status(400).json({
        success: false,
        error: 'Currency codes must be 3-letter codes (e.g., USD, EUR)',
      });
    }

    next();
  },
};

export default validate;