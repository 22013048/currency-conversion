import { EXCHANGE_API_URL, API_KEY } from '../config/env.js';
import cacheService from './cache.service.js';

class CurrencyService {
  async convert(from, to, amount) {
    const cacheKey = `convert_${from}_${to}`;
    const cachedRate = cacheService.get(cacheKey);

    let rate;
    if (cachedRate) {
      rate = cachedRate;
    } else {
      rate = await this.getExchangeRate(from, to);
      cacheService.set(cacheKey, rate);
    }

    return {
      convertedAmount: amount * rate,
      rate,
      timestamp: new Date().toISOString(),
    };
  }

  async getRates(base = 'USD') {
    const cacheKey = `rates_${base}`;
    const cachedRates = cacheService.get(cacheKey);

    if (cachedRates) {
      console.log('returning from cache');
      return cachedRates;
    }

    console.log('fetching from API...');
    console.log(`URL: ${EXCHANGE_API_URL}/${API_KEY}/latest/${base}`);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    try {
      console.log('sending request...');
      const response = await fetch(
        `${EXCHANGE_API_URL}/${API_KEY}/latest/${base}`,
        { signal: controller.signal }
      );

      console.log('response received:', response.status);
      clearTimeout(timeout);

      if (!response.ok) {
        throw new Error(`Failed to fetch rates for ${base}`);
      }

      const data = await response.json();

      if (data.result !== 'success') {
        throw new Error(data['error-type'] || 'API Error');
      }

      cacheService.set(cacheKey, data.conversion_rates);
      return data.conversion_rates;

    } catch (error) {
      clearTimeout(timeout);
      if (error.name === 'AbortError') {
        throw new Error('Request timed out. Please try again.');
      }
      throw error;
    }
  }

  async getExchangeRate(from, to) {
    const rates = await this.getRates(from);

    if (!rates[to]) {
      throw new Error(`Unsupported currency code: ${to}`);
    }

    return rates[to];
  }

  async getSupportedCurrencies() {
    const cacheKey = 'supported_currencies';
    const cached = cacheService.get(cacheKey);

    if (cached) {
      return cached;
    }

    try {
      const rates = await this.getRates('USD');
      const currencies = Object.keys(rates).sort();
      cacheService.set(cacheKey, currencies);
      return currencies;
    } catch (error) {
      throw new Error('Failed to fetch supported currencies');
    }
  }
}

export default new CurrencyService();