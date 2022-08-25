import { v1 as uuid } from 'uuid';
import { Patient, Gender, Entry } from './types';

type PatientFields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };

type EntryFields = { 
  date: unknown,
  type: unknown,
  specialist: unknown,
  diagnosisCodes: unknown,
  description: unknown,
  discharge: {
    date: unknown,
    criteria: unknown
  },
  employerName: unknown,
  sickLeave: {
    startDate: unknown,
    endDate: unknown
  },
  healthCheckRating: unknown
};

const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation }: PatientFields): Patient => {
  const id = uuid();
  const newEntry: Patient = {
    id: id,
    name: parseString(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseString(ssn),
    gender: parseGender(gender),
    occupation: parseString(occupation),
    entries: []
  };

  return newEntry;
};

const toNewMedicalEntry = ({
  date, type, specialist,
  diagnosisCodes, description, discharge,
  employerName, sickLeave, healthCheckRating
}: EntryFields): Entry => {
  const id = uuid();

  switch (type) {
    case "Hospital":
      const newHospitalEntry: Entry = {
        id: id,
        date: parseDate(date),
        type: parseString(type),
        specialist: parseString(specialist),
        diagnosisCodes: parseArray(diagnosisCodes),
        description: parseString(description),
        discharge: {
          date: parseDate(discharge.date),
          criteria: parseString(discharge.criteria),
        },
      };
      return newHospitalEntry;
    case "OccupationalHealthcare":
      const occupationalEntry: Entry = {
        id: id,
        date: parseDate(date),
        type: parseString(type),
        specialist: parseString(specialist),
        employerName: parseString(employerName),
        diagnosisCodes: parseArray(diagnosisCodes),
        description: parseString(description),
        sickLeave: {
          startDate: parseDate(sickLeave.startDate),
          endDate: parseString(sickLeave.endDate),
        },
      };
      return occupationalEntry;
    case "HealthCheck":
      const healthCheckEntry: Entry = {
        id: id,
        date: parseDate(date),
        type: parseString(type),
        specialist: parseString(specialist),
        description: parseString(description),
        healthCheckRating: parseNumber(healthCheckRating),
      };
      return healthCheckEntry;
    default:
      const newDefaultEntry: Entry = {
        id: "error",
        date: "error",
        type: "error",
        specialist: "error",
        diagnosisCodes: ["error"],
        description: "error",
        discharge: {
          date: "error",
          criteria: "error",
        },
      };
      return newDefaultEntry;
  }
};

const parseString = (myString: unknown): string => {
  if (!myString || !isString(myString)) {
    throw new Error('Incorrect or missing string');
  }
  return myString;
};

const parseArray = (myArray: unknown): Array<string> => {
  if (!myArray || !Array.isArray(myArray)) {
    throw new Error('Incorrect or missing string in the array');
  }
  return myArray
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
      throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseNumber = (myNumber: unknown): number => {
  if (!myNumber || !isNumber(myNumber)) {
    throw new Error('Incorrect or missing number');
  }
  return myNumber;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const isNumber = (number: unknown): number is number => {
  return typeof number === 'number' || number instanceof Number;
};

export default {toNewPatientEntry, toNewMedicalEntry};