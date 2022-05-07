import React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import styles from './Loading.module.css'

const Loading = ({ className }) => {
  return (
    <div className={`${styles.loading_box} ${styles[className]}`}>
      <CircularProgress />
    </div>
  )
}

export default Loading
