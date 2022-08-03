import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { Patient } from "../types";
import { useStateValue } from "../state";
import { apiBaseUrl } from "../constants";

const ShowPatient = () => {
  const [{ patient }, dispatch] = useStateValue();
  const id = useParams().id!;

  React.useEffect(() => {
    const fetchPatient = async (id: string) => {
      try {
        const { data: patienFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch({ type: "SET_PATIENT", payload: patienFromApi });
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
    </div>
  );
};

export default ShowPatient;
