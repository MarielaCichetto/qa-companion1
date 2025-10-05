import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { initDb } from './models/database.js';
import testCaseRoutes from './routes/testCases.js';
import bugRoutes from './routes/bugs.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/test-cases', testCaseRoutes);
app.use('/api/bugs', bugRoutes);

initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`QA Companion API listening on port ${PORT}`);
  });
});
