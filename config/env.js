import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 5501;
export const API_KEY = process.env.API_KEY;
export const EXCHANGE_API_URL = 'https://v6.exchangerate-api.com/v6';
