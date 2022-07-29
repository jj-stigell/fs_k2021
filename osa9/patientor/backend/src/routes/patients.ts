import express from 'express';
import { v1 as uuid } from 'uuid';
import patientService from '../services/patientService';
const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.post('/', (req, res) => {
  const id = uuid();
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;

  const newPatient = patientService.addPatient({
    id,
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation
  });

  res.send(newPatient);
});

export default router;