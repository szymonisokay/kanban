import React, { useState } from 'react'
import styles from './AddTask.module.css'
import { useSelector } from 'react-redux'
import {
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material'

const AddTask = ({ onClose, setTask, edit, task }) => {
  const [name, setName] = useState(edit ? task.name : '')
  const [desc, setDesc] = useState(edit ? task.desc : '')
  const [selectedUser, setSelectedUser] = useState(edit ? task.user._id : '')

  const { boards: board } = useSelector((state) => state.board)

  const onUserChange = (event) => {
    const {
      target: { value },
    } = event
    setSelectedUser(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const taskData = {
      name,
      desc,
      user: selectedUser,
    }

    setTask(taskData)

    setName('')
    setDesc('')
    setSelectedUser('')
  }

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal}>
        <Typography variant='h6'>
          {edit ? 'Edit' : 'Create new'} task
        </Typography>
        <div className={styles.modal_content}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <TextField
              variant='outlined'
              label='Title'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <FormControl fullWidth>
              <InputLabel id='select-user'>Assign user</InputLabel>
              <Select
                labelId='select-user'
                displayEmpty
                label='Assign user'
                value={selectedUser}
                onChange={onUserChange}
              >
                {board.users?.map((user) => (
                  <MenuItem key={user._id} value={user._id}>
                    {user.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              multiline
              rows={4}
              label='Description'
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <div className={styles.actions}>
              <Button
                variant='text'
                sx={{ color: 'black' }}
                onClick={onClose}
                type='button'
              >
                Close
              </Button>
              <Button variant='contained' type='submit'>
                {edit ? 'Edit' : 'Create'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default AddTask
