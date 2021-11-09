import React from 'react'
import * as Yup from 'yup'

import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'
import { FormContextProvider } from '@/presentation/contexts/form/form-context'
import { Validation } from '@/presentation/protocols/validation'

import Styles from './login-styles.scss'

type Props = {
  validation: Validation
}

const Login: React.FC<Props> = ({ validation }) => {
  const initialState = {
    errorMessage: '',
    errors: {
      email: 'Campo obrigatório',
      password: 'Campo obrigatório'
    },
    isLoading: false,
    fields: {
      email: '',
      password: ''
    }
  }

  const rules = Yup.object().shape({
    email: Yup.string().email().required('Campo obrigatório'),
    password: Yup.string().required('Campo obrigatório')
  })

  return (
    <div className={Styles.login}>
      <LoginHeader/>
      <FormContextProvider validationSchema={rules} initialState={initialState} validation={validation}>
        <form className={Styles.form}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail"/>
          <Input type="password" name="password" placeholder="Digite sua senha"/>
          <button data-testid="submit-button" disabled className={Styles.submit} type="submit">Entrar</button>
          <span className={Styles.link}>Criar conta</span>
          <FormStatus/>
        </form>
      </FormContextProvider>
      <Footer/>
    </div>
  )
}

export default Login
