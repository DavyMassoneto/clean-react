import React from 'react'
import * as Yup from 'yup'

type FormContextType = {
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  errorMessage: string
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>
  errors: { [key: string]: string }
  setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>
  rules: Yup.ObjectSchema<any>
}

type FormContextProviderProps = {
  rules: Yup.ObjectSchema<any>
}

const FormContext = React.createContext<FormContextType>(undefined)

const useFormContext = (): FormContextType => {
  const context = React.useContext(FormContext)
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormContextProvider')
  }
  return context
}

const FormContextProvider: React.FC<FormContextProviderProps> = ({ children, rules }) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState('')
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({})

  const value = React.useMemo(() => {
    return {
      isLoading,
      setIsLoading,
      errorMessage,
      setErrorMessage,
      errors,
      setErrors,
      rules
    }
  }, [isLoading, errorMessage, errors])

  return (
    <FormContext.Provider value={value}>
      {children}
    </FormContext.Provider>
  )
}

export { FormContext, FormContextProvider, useFormContext }
