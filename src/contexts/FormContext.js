import React, { createContext, useState, useContext } from 'react';

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [isRFCFormOpen, setIsRFCFormOpen] = useState(false);

  const openRFCForm = () => setIsRFCFormOpen(true);
  const closeRFCForm = () => setIsRFCFormOpen(false);

  return (
    <FormContext.Provider value={{ isRFCFormOpen, openRFCForm, closeRFCForm }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext); 