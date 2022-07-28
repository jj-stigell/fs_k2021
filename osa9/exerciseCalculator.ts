interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (dailyExercise: Array<number>, target: number) : Result => {
  const periodLength: number = dailyExercise.length;
  const trainingDays: number = dailyExercise.filter(day => day !== 0).length;
  const success: boolean = dailyExercise.every(day => day >= target);
  const initialValue: number = 0;
  const sum = dailyExercise.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    initialValue
  );
  const average = sum / periodLength;
  let rating: number = 1;
  let ratingDescription = 'Miserable';

  if (success) {
    rating = 3;
    ratingDescription = 'Magnificent!!';
  } else if (average <= target && average >= (target / 2)) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  };

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
// run with command: npm run calculateExercises