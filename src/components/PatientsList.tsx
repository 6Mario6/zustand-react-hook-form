import { usePatientStore } from "../store/store";
import { PatientDetails } from "./PatientDetails";

export const PatientsList = () => {
  const patients = usePatientStore((state) => state.patients);

  return (
    <div className="md:w-1/2 lg:3/5 md:h-screen overflow-y-scroll">
      {patients.length ? (
        <>
          <h2 className="font-black text-3xl text-center">Patients List</h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Manage Patients and {""}
            <span className="text-indigo-600 font-bold">Their Information</span>
          </p>
          {patients.map((patient) => (
            <PatientDetails key={patient.id} patient={patient} />
          ))}
        </>
      ) : (
        <>
          <h2 className="font-black text-3xl text-center">No Patients</h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Add Patients and {""}
            <span className="text-indigo-600 font-bold">Manage Them</span>
          </p>
        </>
      )}
    </div>
  );
};
