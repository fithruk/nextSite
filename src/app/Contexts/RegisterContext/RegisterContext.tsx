"use client";

import { createContext, useContext, useState, ReactNode } from "react";

//"Контактні дані" - Номер телефону, Емейл, Пароль
//"Стан здоров'я" - dateOfBirth, хронічні хвороби, травми, досвід тренувань

export type FormDataTypes = {
  contactInfo: {
    phone: string;
    name: string;
    email: string;
    password: string;
  };
  healthData: {
    chronicDiseases?: string;
    injuries?: string;
    workoutExperience?: string;
  };
};

export type FormStep = keyof FormDataTypes;

type RegistrationContextType = {
  formData: FormDataTypes;
  updateFormData: <
    K extends keyof FormDataTypes,
    F extends keyof FormDataTypes[K]
  >(
    step: K,
    key: F,
    value: FormDataTypes[K][F]
  ) => void;
};

const RegistrationContext = createContext<RegistrationContextType>({
  formData: {
    contactInfo: {
      phone: "",
      name: "",
      email: "",
      password: "",
    },
    healthData: {
      chronicDiseases: "",
      injuries: "",
      workoutExperience: "",
    },
  },
  updateFormData: <
    K extends keyof FormDataTypes,
    F extends keyof FormDataTypes[K]
  >(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    step: K,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    key: F,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    value: FormDataTypes[K][F]
  ) => {},
});

const RegistrationProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<FormDataTypes>({
    contactInfo: {
      phone: "",
      name: "",
      email: "",
      password: "",
    },
    healthData: {
      chronicDiseases: "",
      injuries: "",
      workoutExperience: "",
    },
  });

  const updateFormData = <K extends FormStep, F extends keyof FormDataTypes[K]>(
    step: K,
    key: F,
    value: FormDataTypes[K][F]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [step]: { ...prev[step], [key]: value },
    }));
  };

  return (
    <RegistrationContext.Provider value={{ formData, updateFormData }}>
      {children}
    </RegistrationContext.Provider>
  );
};

const useRegistration = () => useContext(RegistrationContext);

export { RegistrationProvider, useRegistration };
