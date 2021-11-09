import React, { useEffect } from 'react'
import * as Yup from 'yup'

import { Validation } from '@/presentation/protocols/validation'

type FormContextType = {
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  errorMessage: string
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>
  errors: { [key: string]: string }
  setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>
  validationSchema: Yup.ObjectSchema<any>
  fields: { [key: string]: any }
  setFields: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>
}

type FormContextProviderProps = {
  validationSchema: Yup.ObjectSchema<any>
  initialState: {
    isLoading: boolean
    errorMessage: string
    errors: { [key: string]: string }
    fields: { [key: string]: any }
  }
  validation: Validation
}

const FormContext = React.createContext<FormContextType>(undefined)

const useFormContext = (): FormContextType => {
  const context = React.useContext(FormContext)
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormContextProvider')
  }
  return context
}

const FormContextProvider: React.FC<FormContextProviderProps> = ({ children, validationSchema, initialState, validation }) => {
  const [isLoading, setIsLoading] = React.useState(initialState.isLoading)
  const [errorMessage, setErrorMessage] = React.useState(initialState.errorMessage)
  const [errors, setErrors] = React.useState<{ [key: string]: string }>(initialState.errors)
  const [fields, setFields] = React.useState<{ [key: string]: any }>(initialState.fields)

  const value = React.useMemo(() => {
    return {
      isLoading,
      setIsLoading,
      errorMessage,
      setErrorMessage,
      errors,
      setErrors,
      validationSchema,
      fields,
      setFields
    }
  }, [isLoading, errorMessage, errors])

  useEffect(() => {
    validation.validate(fields)
  }, [fields])

  return (
    <FormContext.Provider value={value}>
      {children}
    </FormContext.Provider>
  )
}

export { FormContext, FormContextProvider, useFormContext }
