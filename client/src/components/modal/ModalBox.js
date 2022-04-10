import React, { useRef, useState } from 'react'
import styles from './Modal.module.css'
import { useDispatch } from 'react-redux'

import { addBoard } from '../../features/boards/boardSlice'

import {
  Modal,
  Box,
  FormControl,
  FormGroup,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'

const ModalBox = ({ method, title, isOpen, handleClose }) => {
  const nameInputRef = useRef()
  const descInputRef = useRef()

  const [type, setType] = useState('')

  const dispatch = useDispatch()

  const onFormSubmit = (e) => {
    e.preventDefault()

    const name = nameInputRef.current.value
    const desc = descInputRef.current.value

    if (!name) {
      return
    }

    dispatch(addBoard({ name, desc }))
  }

  const handleTypeChange = (event) => {
    setType(event.target.value)
  }

  return (
    <>
      <Modal open={isOpen}>
        <Box className={styles.modal}>
          <FormControl fullWidth>
            <InputLabel id='type'>Select what to add</InputLabel>
            <Select
              labelId='type'
              value={type}
              onChange={handleTypeChange}
              label='Select what to add'
            >
              <MenuItem value='board'>New board</MenuItem>
              <MenuItem value='team'>New team</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Modal>
    </>
  )
}

export default ModalBox
