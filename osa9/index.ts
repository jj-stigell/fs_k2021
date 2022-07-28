import express from 'express';
import calculateBmi from './bmiCalculator'
const app = express();

app.get('/hello', (_req: any, res: { send: (arg0: string) => void; }) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req: any, res: any) => {
  const height = req.query.height
  const weight = req.query.weight

  if (!height || !weight || isNaN(height) || isNaN(weight)) {
    res.json({ error: "malformatted parameters" })
  } else {
    const result = calculateBmi(height, weight);
    res.json({
      weight: weight,
      height: height,
      bmi: result
    });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
