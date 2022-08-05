import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { Entry, Patient } from "../types";
import { useStateValue, setPatient } from "../state";
import { apiBaseUrl } from "../constants";
import EntryDetails from "./EntryDetails";

const ShowPatient = () => {
  const [{ patient }, dispatch] = useStateValue();
  const id = useParams().id!;

  React.useEffect(() => {
    const fetchPatient = async (id: string) => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setPatient(patientFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatient(id);
  }, [dispatch]);

  return (
    <div className="App">
      <h2>{patient.name} (gender: {patient.gender})</h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <h3>entries</h3>
      {Object.values(patient.entries).map((entry: Entry) => (
        <EntryDetails key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

export default ShowPatient;
