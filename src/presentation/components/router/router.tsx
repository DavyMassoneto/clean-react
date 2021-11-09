import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Login } from '@/presentation/pages'
import { Validation } from '../../protocols/validation'

class ValidationSpy implements Validation {
  errorMessage: string
  fieldName: string
  fieldValue: string

  validate (fieldName: string, fieldValue: string): string | null {
    this.fieldName = fieldName
    this.fieldValue = fieldValue
    return this.errorMessage
  }
}

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login validation={new ValidationSpy()}/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
