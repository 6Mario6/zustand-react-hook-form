import { useForm } from "react-hook-form";
import { Error } from "./Error";
import { type DraftPatient } from "../types";
import { usePatientStore } from "../store/store";
import { useEffect } from "react";
import { toast } from "react-toastify";
export const PatientForm = () => {
  const { addPatient, activeId, patients, updatePatient } = usePatientStore();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<DraftPatient>();

  useEffect(() => {
    if (activeId) {
      const activePatient = patients.filter(
        (patient) => patient.id === activeId
      )[0];
      setValue("name", activePatient.name);
      setValue("caretaker", activePatient.caretaker);
      setValue("email", activePatient.email);
      setValue("date", activePatient.date);
      setValue("symptoms", activePatient.symptoms);
    }
  }, [activeId]);

  const registerPatient = (date: DraftPatient) => {
    activeId ? updatePatient(date) : addPatient(date);
    toast("Patient saved successfully!", {
      type: "success",
    });
    reset();
  };

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Patient Tracking</h2>

      <p className="text-lg mt-5 text-center mb-10">
        Add Patients and {""}
        <span className="text-indigo-600 font-bold">Manage Them</span>
      </p>

      <form
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
        noValidate
        onSubmit={handleSubmit(registerPatient)}
      >
        <div className="mb-5">
          <label htmlFor="name" className="text-sm uppercase font-bold">
            Patient
          </label>
          <input
            id="name"
            className="w-full p-3 border border-gray-100"
            type="text"
            placeholder="Patient's Name"
            {...register("name", {
              required: "The patient's name is required.",
            })}
          />
          {errors.name && <Error>{errors.name.message}</Error>}
        </div>

        <div className="mb-5">
          <label htmlFor="caretaker" className="text-sm uppercase font-bold">
            Owner
          </label>
          <input
            id="caretaker"
            className="w-full p-3 border border-gray-100"
            type="text"
            placeholder="Owner's Name"
            {...register("caretaker", {
              required: "The owner's name is required.",
            })}
          />
          {errors.caretaker && <Error>{errors.caretaker.message}</Error>}
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="text-sm uppercase font-bold">
            Email
          </label>
          <input
            id="email"
            className="w-full p-3 border border-gray-100"
            type="email"
            placeholder="Registration Email"
            {...register("email", {
              required: "The email is required.",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email.",
              },
            })}
          />
          {errors.email && <Error>{errors.email.message}</Error>}
        </div>

        <div className="mb-5">
          <label htmlFor="date" className="text-sm uppercase font-bold">
            Admission Date
          </label>
          <input
            id="date"
            className="w-full p-3 border border-gray-100"
            type="date"
            {...register("date", {
              required: "The admission date is required.",
            })}
          />
          {errors.date && <Error>{errors.date.message}</Error>}
        </div>

        <div className="mb-5">
          <label htmlFor="symptoms" className="text-sm uppercase font-bold">
            Symptoms
          </label>
          <textarea
            id="symptoms"
            className="w-full p-3 border border-gray-100"
            placeholder="Patient's Symptoms"
            {...register("symptoms", {
              required: "The patient's symptoms are required.",
            })}
          />
          {errors.symptoms && <Error>{errors.symptoms.message}</Error>}
        </div>

        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
          value="Save Patient"
        />
      </form>
    </div>
  );
};
