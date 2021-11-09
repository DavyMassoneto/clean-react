import React from 'react'

import Styles from './input-styles.scss'
import { useFormContext } from '../../contexts/form/form-context'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const { errors, fields, setFields } = useFormContext()

  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false
  }

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target

    setFields(oldValue => ({ ...oldValue, [name]: value }))
  }

  return (
    <div className={Styles.inputWrap}>
      <input data-testid={`${props.name}-input`} ref={inputRef} {...props} readOnly onFocus={enableInput}
             value={fields[props.name]} onChange={handleOnChange}/>
      {errors[props.name] &&
      <span data-testid={`${props.name}-status`} title={errors[props.name]} className={Styles.status}>🔴</span>}
    </div>
  )
}

export default Input
