import { useStateValue } from "../state";
import { Entry } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {

  const [{ diagnosis }] = useStateValue();

  const style = {
    border: "solid",
    backgroundColor: "LightBlue",
    padding: "10px",
  };

  switch (entry.type) {
    case "Hospital":
      return (
        <div style={style}>
        Date: {entry.date} Visit type: {entry.type} 
        <br/>
        {entry.description}
        <br/>
        Diagnosis codes:
        <ul>
          {entry.diagnosisCodes?.map((code) => (
            <li key={code}>{code} {diagnosis[code].name}</li>
          ))}
        </ul>
        <br/>
        Discharge date: {entry.discharge.date} Criteria for discharge: {entry.discharge.criteria}

        <br/>
        Diagnosed by: {entry.specialist}
      </div>
      );
    case "OccupationalHealthcare":
      return (
        <div style={style}>
        Date: {entry.date} Visit type: {entry.type} 
        <br/>
        {entry.description}
        <br/>
        Employer: {entry.employerName}
        <br/>
        Diagnosed by: {entry.specialist}
      </div>
      );
    case "HealthCheck":
      return (
        <div style={style}>
          Date: {entry.date} Type: {entry.type} 
          <br/>
          {entry.description}
          <br/>
          Health rating: {entry.healthCheckRating}
          <br/>
          Diagnosed by: {entry.specialist}
        </div>
      );
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
