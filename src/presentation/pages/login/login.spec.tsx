import React from 'react'
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react'

import { Validation } from '@/presentation/protocols/validation'

import Login from './login'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
}

class ValidationSpy implements Validation {
  errorMessage: string
  input: object

  validate (input: object): string | null {
    console.log({ input })
    this.input = input
    return this.errorMessage
  }
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = render(<Login validation={validationSpy}/>)
  return { sut, validationSpy }
}

describe('Login component', () => {
  afterEach(cleanup)

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

  test('Should call Validation with correct email', () => {
    const { sut, validationSpy } = makeSut()
    const emailInput = sut.getByTestId('email-input') as HTMLInputElement
    fireEvent.input(emailInput, { target: { value: 'any_value' } })
    expect(validationSpy.input).toEqual({
      email: 'any_value'
    })
  })

  test('Should call Validation with correct password', () => {
    const { sut, validationSpy } = makeSut()
    const passwordInput = sut.getByTestId('password-input') as HTMLInputElement
    fireEvent.input(passwordInput, { target: { value: 'any_value' } })
    expect(validationSpy.input).toEqual({
      password: 'any_value'
    })
  })
})
