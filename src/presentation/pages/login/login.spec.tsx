import React from 'react'
import { render } from '@testing-library/react'

import Login from './login'

describe('Login component', () => {
  test('Should not render spinner and error on start', () => {
    const { getByTestId } = render(<Login/>)
    const errorWrap = getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)
  })

  test('Should button start with disabled state', () => {
    const { getByTestId } = render(<Login/>)
    const submitButton = getByTestId('submit-button') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
  })

  test('Should email status input start with required error', () => {
    const { queryByTestId } = render(<Login/>)
    const emailStatus = queryByTestId('email-status')
    expect(emailStatus.title).toBe('Campo obrigatório')
    expect(emailStatus.textContent).toBe('🔴')
  })

  test('Should password status input start with required error', () => {
    const { queryByTestId } = render(<Login/>)
    const passwordStatus = queryByTestId('password-status')
    expect(passwordStatus.title).toBe('Campo obrigatório')
    expect(passwordStatus.textContent).toBe('🔴')
  })
})
