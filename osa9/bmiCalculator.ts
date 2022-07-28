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

console.log(calculateBmi(180, 74));
// run with command: npm run calculateBmi