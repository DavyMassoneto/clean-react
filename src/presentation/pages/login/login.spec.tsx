import React from 'react'
import { render, RenderResult } from '@testing-library/react'

import Login from './login'

type SutTypes = {
  sut: RenderResult
}

const makeSut = (): SutTypes => {
  const sut = render(<Login/>)
  return { sut }
}

describe('Login component', () => {
  test('Should not render spinner and error on start', () => {
    const { sut } = makeSut()
    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)
  })

  test('Should button start with disabled state', () => {
    const { sut } = makeSut()
    const submitButton = sut.getByTestId('submit-button') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
  })

  test('Should email status input start with required error', () => {
    const { sut } = makeSut()
    const emailStatus = sut.queryByTestId('email-status')
    expect(emailStatus.title).toBe('Campo obrigatório')
    expect(emailStatus.textContent).toBe('🔴')
  })

  test('Should password status input start with required error', () => {
    const { sut } = makeSut()
    const passwordStatus = sut.queryByTestId('password-status')
    expect(passwordStatus.title).toBe('Campo obrigatório')
    expect(passwordStatus.textContent).toBe('🔴')
  })
})
