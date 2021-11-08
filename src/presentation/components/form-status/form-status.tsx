import React, { memo } from 'react'

import Styles from './form-status-styles.scss'
import Spinner from '../spinner/spinner'

const FormStatus: React.FC = () => {
  return (
    <div className={Styles.errorWrap}>
      <span className={Styles.error}>Erro</span>
      <Spinner className={Styles.spinner}/>
    </div>
  )
}

export default memo(FormStatus)
