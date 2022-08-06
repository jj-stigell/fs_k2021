import express from 'express';
import patientService from '../services/patientService';
import entries from '../utils';
const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.post('/', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatient = entries.toNewPatientEntry(req.body);
    const newEntry = patientService.addPatient(newPatient);
    res.json(newEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const id: string = req.params.id;
    const entryToAdd = entries.toNewMedicalEntry(req.body);
    const newEntry = patientService.addEntry(entryToAdd, id);
    res.json(newEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.get('/:id', (req, res) => {
  const id: string = req.params.id;
  res.send(patientService.getPatientById(id));
});

export default router;