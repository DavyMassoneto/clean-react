import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Login } from '@/presentation/pages'
import { ValidationSpy } from '@/presentation/test'

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
