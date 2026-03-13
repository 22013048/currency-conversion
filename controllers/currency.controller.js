import currencyService from '../services/currency.service.js';

export const convert = async (req, res, next) => {
  try {
    const { from, to, amount } = req.query;

    const result = await currencyService.convert(
      from.toUpperCase(),
      to.toUpperCase(),
      parseFloat(amount)
    );

    res.json({
      success: true,
      data: {
        from: from.toUpperCase(),
        to: to.toUpperCase(),
        amount: parseFloat(amount),
        convertedAmount: result.convertedAmount,
        rate: result.rate,
        timestamp: result.timestamp,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getRates = async (req, res, next) => {
  try {
    const base = req.query.base ? req.query.base.toUpperCase() : 'USD';
    const rates = await currencyService.getRates(base);

    res.json({
      success: true,
      data: { base, rates },
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrencies = async (req, res, next) => {
  try {
    const currencies = await currencyService.getSupportedCurrencies();

    res.json({
      success: true,
      data: currencies,
    });
  } catch (error) {
    next(error);
  }
};