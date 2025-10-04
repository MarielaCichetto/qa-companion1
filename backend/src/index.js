import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { createDatabase } from './services/database.js';
import testCaseRoutes from './routes/testCaseRoutes.js';
import bugRoutes from './routes/bugRoutes.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

createDatabase();

app.get('/', (req, res) => {
  res.json({ message: 'QA Companion API' });
});

app.use('/api/test-cases', testCaseRoutes);
app.use('/api/bugs', bugRoutes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
