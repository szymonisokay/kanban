import React, { useState } from 'react'
import styles from './AddTask.module.css'
import { useSelector, useDispatch } from 'react-redux'
import {
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material'
import TasksService from '../../services/TasksService'

const AddTask = ({ status, onClose, setTasks }) => {
  const { boards: board } = useSelector((state) => state.board)
  const { user } = useSelector((state) => state.users)

  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [selectedUser, setSelectedUser] = useState('')

  const onUserChange = (event) => {
    const {
      target: { value },
    } = event
    setSelectedUser(value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const taskData = {
      name,
      desc,
      user: selectedUser,
      status,
      boardId: board._id,
    }

    const task = await TasksService.createTask(taskData, user.token)

    setTasks((prev) => [...prev, task])

    setName('')
    setDesc('')
    setSelectedUser('')
  }

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal}>
        <Typography variant='h6'>Create new task</Typography>
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
                Create
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default AddTask
