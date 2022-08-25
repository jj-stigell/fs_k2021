import patientsData from '../data/patients';
import { Patient, NonSensitivePatient, Entry } from '../types';

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

const addEntry = (newEntry: Entry, patientId: string): Entry => {
  patients.forEach(patient => {
    patient.id === patientId ? patient.entries.push(newEntry) : patient
  });
  return newEntry;
};

const getPatientById = (patientId: string): any => {
  const patient = patients.find(patient => patient.id === patientId);
  return patient;
};

export default { getPatients, addPatient, getPatientById, addEntry };