import express from 'express';
import cors from 'cors';
import routes from './routes/index.routes.js';
import healthRouter from './routes/health.routes.js';
import errorHandler from './middleware/errorHandler.js';
import rateLimiter  from './middleware/rateLimiter.js';

const app = express();

app.use(cors());
app.use(express.json());


app.get('/test', (req, res) => {
  res.json({ message: 'working' });
});

app.use('/api', routes);
app.use('/api/health', healthRouter);

app.use(errorHandler);

export default app;
