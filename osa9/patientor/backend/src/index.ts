import express from 'express';
import diagnoseRouter from './routes/diagnoses';
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.use('/api/diagnoses', diagnoseRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});