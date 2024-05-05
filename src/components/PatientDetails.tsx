import { Patient } from "../types";
import PatientDetailItem from "./PatientDetailItem";

type PatientDetailsProps = {
  patient: Patient;
};

export const PatientDetails = ({ patient }: PatientDetailsProps) => {
  return (
    <div className="mx-5 my-10  px-5 py-10 bg-white shadow-md rounded-xl">
      <PatientDetailItem label="ID" data={patient.id} />
      <PatientDetailItem label="Name" data={patient.name} />
      <PatientDetailItem label="Caretaker" data={patient.caretaker} />
      <PatientDetailItem label="Email" data={patient.email} />
      <PatientDetailItem label="date" data={patient.date} />
      <PatientDetailItem label="symptoms" data={patient.symptoms} />
    </div>
  );
};
