import React from 'react'
import styles from './AddTask.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { Typography, TextField } from '@mui/material'

const AddTask = ({ status, onClose }) => {
  const { boards: board } = useSelector((state) => state.board)

  console.log(board)
  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal}>
        <Typography variant='h6'>Create new task</Typography>
        <div className={styles.modal_content}>
          <TextField variant='outlined' label='Title' size='small' />
        </div>
      </div>
    </>
  )
}

export default AddTask
