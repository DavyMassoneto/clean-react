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
})
