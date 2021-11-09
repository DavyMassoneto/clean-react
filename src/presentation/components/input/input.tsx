import React, { useEffect } from 'react'
import * as Yup from 'yup'

import Styles from './input-styles.scss'
import { useFormContext } from '../../contexts/form/form-context'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const { errors, setErrors, rules } = useFormContext()

  useEffect(() => {
    try {
      Yup.reach(rules, props.name)
        .validateSync(inputRef?.current?.value)
      setErrors(oldValue => ({ ...oldValue, [props.name]: undefined }))
    } catch (error) {
      setErrors(oldValue => ({ ...oldValue, [props.name]: error.message }))
    }
  }, [inputRef?.current?.value])

  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false
  }

  return (
    <div className={Styles.inputWrap}>
      <input ref={inputRef} {...props} readOnly onFocus={enableInput}/>
      {errors[props.name] &&
      <span data-testid={`${props.name}-status`} title={errors[props.name]} className={Styles.status}>🔴</span>}
    </div>
  )
}

export default Input
