import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button } from "@material-ui/core";
import { Entry, Patient } from "../types";
import { useStateValue, setPatient } from "../state";
import { apiBaseUrl } from "../constants";
import EntryDetails from "./EntryDetails";
import AddEntryModal from "../AddEntryModal";
import { FormValues } from "../AddEntryModal/EntryForm";

const ShowPatient = () => {
  const [{ patient }, dispatch] = useStateValue();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const id = useParams().id!;

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: FormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${patient.id}/entries`,
        values
      );

      const payload = {
        newEntry: newEntry,
        patientId: patient.id
      };

      dispatch({ type: "ADD_ENTRY", payload: payload });
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(String(e?.response?.data?.error) || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

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
  }, [dispatch, submitNewEntry]);

  return (
    <div className="App">
      <h2>{patient.name} (gender: {patient.gender})</h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <h3>entries</h3>
      {Object.values(patient.entries).map((entry: Entry) => (
        <EntryDetails key={entry.id} entry={entry} />
      ))}
      <h3>add new entry (type: Health Check)</h3>
      <AddEntryModal
        modalOpen={modalOpen}
        onClose={closeModal}
        onSubmit={submitNewEntry}
        error={error}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
    </div>
  );
};

export default ShowPatient;
