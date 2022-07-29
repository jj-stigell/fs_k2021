import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res: { send: (arg0: string) => void; }) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment 
  const height = req.query.height;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment 
  const weight = req.query.weight;

  if (!height || !weight) {
    res.json({ error: "malformatted parameters" });
    return;
  } 
  
  try {
    const result = calculateBmi(Number(height), Number(weight));
    res.json({
      weight: weight,
      height: height,
      bmi: result
    });
  } catch (error) {
    res.json({ error: "malformatted parameters" });

  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment 
  const { daily_exercises, target} = req.body;

  if (!daily_exercises || !target) {
    res.json({ error: "parameters missing" });
    return;
  } 

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculateExercises(daily_exercises, target);
    res.json(result);
  } catch (error) {
    res.json({ error: "malformatted parameters" });

  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
