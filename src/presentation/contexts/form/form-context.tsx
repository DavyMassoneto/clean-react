import React from 'react'

type FormContextType = {
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  errorMessage: string
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>
}

const FormContext = React.createContext<FormContextType>(undefined)

const useFormContext = (): FormContextType => {
  const context = React.useContext(FormContext)
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormContextProvider')
  }
  return context
}

const FormContextProvider: React.FC = ({ children }) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState('')

  const value = React.useMemo(() => {
    return {
      isLoading,
      setIsLoading,
      errorMessage,
      setErrorMessage
    }
  }, [isLoading, errorMessage])

  return (
    <FormContext.Provider value={value}>
      {children}
    </FormContext.Provider>
  )
}

export { FormContext, FormContextProvider, useFormContext }
