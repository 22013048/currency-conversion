# Currency Conversion API

A lightweight, production-ready REST API for real-time currency conversion built with Node.js and Express.js. Supports 160+ currencies with intelligent in-memory caching to minimize external API calls.

---

## Features

- Real-time exchange rates powered by [ExchangeRate API](https://www.exchangerate-api.com)
- In-memory caching with configurable TTL to reduce API usage
- Input validation on all query parameters
- Rate limiting to prevent API abuse
- Global error handling with clean JSON responses
- CORS enabled for cross-origin requests
- Health check endpoint for uptime monitoring

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express.js | Web framework |
| ExchangeRate API | Live exchange rate data source |
| dotenv | Environment variable management |

---

## Project Structure

```
currency-conversion/
├── config/
│   └── env.js                  # Environment variable configuration
├── controllers/
│   └── currency.controller.js  # Request and response handlers
├── middleware/
│   ├── errorHandler.js         # Global error handling
│   ├── rateLimiter.js          # Request rate limiting
│   └── validate.js             # Input validation
├── routes/
│   ├── index.routes.js         # Route aggregator
│   ├── currency.routes.js      # Currency endpoints
│   └── health.routes.js        # Health check endpoint
├── services/
│   ├── currency.service.js     # Business logic and API integration
│   └── cache.service.js        # In-memory caching layer
├── .env.example                # Environment variable template
├── .gitignore
├── app.js                      # Express application setup
├── server.js                   # Server entry point
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js v18 or higher
- A free API key from [ExchangeRate API](https://www.exchangerate-api.com)

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/your-username/currency-conversion.git
cd currency-conversion
```

**2. Install dependencies**

```bash
npm install
```

**3. Configure environment variables**

Create a `.env` file in the root directory:

```env
PORT=5501
API_KEY=your_api_key_here
```

**4. Start the server**

```bash
# Development mode (auto-restart on file changes)
npm run dev

# Production mode
npm start
```

The server will start at `http://localhost:5501`

---

## API Endpoints

### Health Check

Check if the server is running.

```
GET /api/health
```

**Response:**
```json
{
  "status": "OK",
  "uptime": 120.45,
  "timestamp": "2026-03-13T10:00:00.000Z"
}
```

---

### Convert Currency

Convert an amount from one currency to another.

```
GET /api/currency/convert?from=USD&to=EUR&amount=100
```

| Parameter | Type | Required | Description |
|---|---|---|---|
| `from` | string | Yes | Source currency code (e.g. USD) |
| `to` | string | Yes | Target currency code (e.g. EUR) |
| `amount` | number | Yes | Amount to convert |

**Response:**
```json
{
  "success": true,
  "data": {
    "from": "USD",
    "to": "EUR",
    "amount": 100,
    "convertedAmount": 86.73,
    "rate": 0.8673,
    "timestamp": "2026-03-13T10:00:00.000Z"
  }
}
```

---

### Get Exchange Rates

Get all exchange rates for a base currency.

```
GET /api/currency/rates?base=USD
```

| Parameter | Type | Required | Description |
|---|---|---|---|
| `base` | string | No | Base currency code (default: USD) |

**Response:**
```json
{
  "success": true,
  "data": {
    "base": "USD",
    "rates": {
      "EUR": 0.8673,
      "GBP": 0.7485,
      "TZS": 2581.71
    }
  }
}
```

---

### Get Supported Currencies

Get a list of all supported currency codes.

```
GET /api/currency/currencies
```

**Response:**
```json
{
  "success": true,
  "data": ["AED", "AFN", "ALL", "AMD", "EUR", "GBP", "TZS", "USD"]
}
```

---

## Error Handling

All errors return a consistent JSON response:

```json
{
  "success": false,
  "error": "Error message here"
}
```

| Status Code | Meaning |
|---|---|
| 400 | Bad Request — missing or invalid parameters |
| 429 | Too Many Requests — rate limit exceeded |
| 500 | Internal Server Error |

---

## Caching Strategy

Exchange rates are cached in memory for 1 hour per base currency. This means:

- **First request** — fetches live data from ExchangeRate API (1–3 seconds)
- **Subsequent requests within 1 hour** — served from cache (instant)

This significantly reduces external API calls and improves response times.

---

## Environment Variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `PORT` | No | `3000` | Port the server runs on |
| `API_KEY` | Yes | — | ExchangeRate API key |

---

## License

MIT
