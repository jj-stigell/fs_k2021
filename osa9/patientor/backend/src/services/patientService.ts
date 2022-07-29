import patientsData from '../data/patients.json';
import { Patient, NonSensitivePatient } from '../types';

const patients: Array<Patient> = patientsData as Array<Patient>;

const getPatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default { getPatients };