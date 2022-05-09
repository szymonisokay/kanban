import React from 'react'
import styles from './AddBoard.module.css'

import { Typography } from '@mui/material'

const AddBoard = () => {
  return (
    <div className={styles.container}>
      <Typography variant='h6'>Add new board</Typography>
      <section className={styles.add_form}></section>
    </div>
  )
}

export default AddBoard
