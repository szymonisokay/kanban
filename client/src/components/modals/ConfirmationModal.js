import React from 'react'
import styles from './Modals.module.css'
import { Button, Typography } from '@mui/material'
import { Close } from '@mui/icons-material'

const ConfirmationModal = ({
  title,
  buttonText,
  error,
  onClose,
  onConfirm,
}) => {
  return (
    <>
      <div className={styles.modal_overlay} />
      <div className={styles.modal}>
        <Close className={styles.icon} onClick={onClose} />
        <div className={styles.modal_content}>
          <Typography variant='subtitle1'>{title}</Typography>
        </div>
        <div className={styles.modal_actions}>
          <Button
            variant='text'
            sx={{ color: 'black', padding: '6px 16px' }}
            onClick={onClose}
          >
            Close
          </Button>
          <Button
            variant='contained'
            color={error ? 'error' : 'primary'}
            onClick={onConfirm}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </>
  )
}

export default ConfirmationModal
