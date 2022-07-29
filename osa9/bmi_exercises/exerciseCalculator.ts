interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface inputValues {
  dailyExercise: Array<number>,
  target: number
}

const parseArgs = (args: Array<string>): inputValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  const dailyExercise = args.slice(3).map(hours => Number(hours));
  const target = Number(args[2]);

  if (!isNaN(target) && dailyExercise.every(hours => !isNaN(hours))) {
    return {
      dailyExercise,
      target
    };
  } else {
    throw new Error('Provided values are invalid!');
  }
};

const calculateExercises = (dailyExercise: Array<number>, target: number) : Result => {
  const periodLength: number = dailyExercise.length;
  const trainingDays: number = dailyExercise.filter(day => day !== 0).length;
  const success: boolean = dailyExercise.every(day => day >= target);
  const initialValue = 0;
  const sum = dailyExercise.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    initialValue
  );
  const average = sum / periodLength;
  let rating = 1;
  let ratingDescription = 'bad';

  if (success) {
    rating = 3;
    ratingDescription = 'Magnificent!!';
  } else if (average <= target && average >= (target / 2)) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { dailyExercise, target } = parseArgs(process.argv);
  console.log(calculateExercises(dailyExercise, target));
} catch (error: unknown) {
  let errorMessage = 'Error happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

export default calculateExercises;
// run with command: npm run calculateExercises 'target: number' 'hours per day: array<number>'