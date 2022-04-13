import React, { useRef, useState } from 'react'
import styles from './Modal.module.css'
import { useDispatch, useSelector } from 'react-redux'

import { addBoard } from '../../features/boards/boardSlice'

import {
  Modal,
  Box,
  FormControl,
  FormGroup,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Input,
  TextField,
  Button,
} from '@mui/material'

const ModalBox = ({ method, title, isOpen, handleClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    desc: '',
  })

  const dispatch = useDispatch()
  const board = useSelector((state) => state.board)

  const onFormSubmit = (e) => {
    e.preventDefault()

    console.log(formData)
    if (!formData.name) {
      return handleClose()
    }

    dispatch(addBoard({ name: formData.name, desc: formData.desc }))
    console.log(board)
    // handleClose()
  }

  return (
    <>
      <Modal open={isOpen} onBackdropClick={handleClose}>
        <Box className={styles.modal}>
          <Typography variant='h6' fontWeight={700} color='dark'>
            Add new {title}
          </Typography>
          <form onSubmit={onFormSubmit}>
            <TextField
              id='name'
              variant='outlined'
              label='Name'
              autoComplete='off'
              value={formData.name}
              onChange={(e) => setFormData({ name: e.target.value })}
            />
            <TextField
              id='desc'
              variant='outlined'
              multiline
              rows={4}
              label='Description'
              value={formData.desc}
              onChange={(e) => setFormData({ desc: e.target.value })}
            />

            <Button variant='contained' type='submit' onClick={onFormSubmit}>
              Add
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  )
}

export default ModalBox
