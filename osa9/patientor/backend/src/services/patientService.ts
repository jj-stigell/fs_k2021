import patientsData from '../data/patients.json';
import { Patient, NonSensitivePatient } from '../types';

const patients: Array<Patient> = patientsData as Array<Patient>;

const getPatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const addPatient = (newPatient: Patient): Patient => {
  patients.push(newPatient);
  return newPatient;
};

const getPatientById = (patientId: string): any => {
  const patient = patients.find(patient => patient.id === patientId);
  return patient;
};

export default { getPatients, addPatient, getPatientById };