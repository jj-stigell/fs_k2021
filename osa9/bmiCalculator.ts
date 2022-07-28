interface Bodyinfo {
  height: number,
  mass: number
}

const parseArguments = (args: Array<string>): Bodyinfo => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      mass: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  };
}

const calculateBmi = (height: number, mass: number) : string => {
  const BMI: number = mass / ((height * height) / 10000);

  if (BMI < 16.0) {
    return 'Underweight (Severe thinness)';
  } else if (BMI >= 16.0 && BMI <= 16.9) {
    return 'Underweight (Moderate thinness)';
  } else if (BMI > 16.9 && BMI <= 18.4) {
    return 'Underweight (Mild thinness)';
  } else if (BMI > 18.4 && BMI <= 24.9) {
    return 'Normal (healthy weight)';
  } else if (BMI > 24.9 && BMI <= 29.9) {
    return 'Overweight (Pre-obese)';
  } else if (BMI > 29.9 && BMI <= 34.9) {
    return 'Obese (Class I)';
  } else if (BMI > 34.9 && BMI <= 39.9) {
    return 'Obese (Class II)';
  } else if (BMI > 39.9) {
    return 'Obese (Class III)';
  }
}

try {
  const { height, mass } = parseArguments(process.argv);
  console.log(calculateBmi(height, mass));
} catch (error: unknown) {
  let errorMessage = 'Error happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  };
  console.log(errorMessage);
}

// run with command: npm run calculateBmi 'height' 'mass'