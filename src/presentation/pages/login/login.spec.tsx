import React from 'react'
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react'
import faker from 'faker'

import { ValidationSpy } from '@/presentation/test'

import Login from './login'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
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
    const email = faker.internet.email()
    fireEvent.input(emailInput, { target: { value: email } })
    expect(validationSpy.fieldName).toEqual('email')
    expect(validationSpy.fieldValue).toEqual(email)
  })

  test('Should call Validation with correct password', () => {
    const { sut, validationSpy } = makeSut()
    const passwordInput = sut.getByTestId('password-input') as HTMLInputElement
    const password = faker.internet.password()
    fireEvent.input(passwordInput, { target: { value: password } })
    expect(validationSpy.fieldName).toEqual('password')
    expect(validationSpy.fieldValue).toEqual(password)
  })

  test('Should show email error if Validation fails', () => {
    const { sut, validationSpy } = makeSut()
    const errorMessage = faker.random.words()
    validationSpy.errorMessage = errorMessage
    const emailInput = sut.getByTestId('email-input') as HTMLInputElement
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    expect(validationSpy.fieldName).toEqual('email')
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(errorMessage)
    expect(emailStatus.textContent).toBe('🔴')
  })
})
