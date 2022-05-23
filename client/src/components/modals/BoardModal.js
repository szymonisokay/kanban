import React, { useState } from 'react'
import styles from './Modals.module.css'
import { Button, FormControl, TextField, Typography } from '@mui/material'

const BoardModal = ({ onClose, onConfirm, board }) => {
  const [name, setName] = useState(board.name || '')
  const [desc, setDesc] = useState(board.desc || '')

  const onSubmit = (event) => {
    event.preventDefault()

    if (!name || !desc) {
      return
    }

    const boardData = {
      name,
      desc,
    }

    onConfirm(boardData)
  }

  return (
    <>
      <div className={styles.modal_overlay} onClick={onClose} />
      <div className={styles.modal}>
        <Typography variant='h6'>Edit board</Typography>
        <form className={styles.form} onSubmit={onSubmit}>
          <FormControl fullWidth>
            <TextField
              id='name'
              label='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              multiline
              rows={4}
              id='desc'
              label='Desc'
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </FormControl>
          <div className={styles.modal_actions}>
            <Button variant='text' sx={{ color: 'black' }} onClick={onClose}>
              Close
            </Button>
            <Button type='submit' variant='contained' color='primary'>
              Edit
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}

export default BoardModal
