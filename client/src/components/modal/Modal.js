import { Modal, Box } from '@mui/material'
import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { addBoard } from '../../features/boards/boardSlice'
import styles from './Modal.module.css'

const ModalBox = ({ method, title, isOpen, handleClose }) => {
  const nameInputRef = useRef()
  const descInputRef = useRef()

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

  return (
    <>
      <Modal open={isOpen} onClick={() => handleClose()}>
        <Box className={styles.modal}>modal</Box>
      </Modal>
    </>
  )
}

export default ModalBox
