import React, { memo } from 'react'

import { useFormContext } from '@/presentation/contexts/form/form-context'

import Spinner from '../spinner/spinner'

import Styles from './form-status-styles.scss'

const FormStatus: React.FC = () => {
  const { isLoading, errorMessage } = useFormContext()
  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {errorMessage && <span className={Styles.error}>{errorMessage}</span>}
      {isLoading && <Spinner className={Styles.spinner}/>}
    </div>
  )
}

export default memo(FormStatus)
