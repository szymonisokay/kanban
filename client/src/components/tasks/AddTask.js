import React, { useState } from 'react'
import styles from './AddTask.module.css'
import { useSelector, useDispatch } from 'react-redux'
import {
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Box,
  Chip,
  MenuItem,
  Button,
} from '@mui/material'

const AddTask = ({ status, onClose }) => {
  const { boards: board } = useSelector((state) => state.board)
  const [selectedUsers, setSelectedUsers] = useState([])

  const onUserChange = (event) => {
    const {
      target: { value },
    } = event

    setSelectedUsers(typeof value === 'string' ? value.split(',') : value)
  }

  console.log(board)
  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal}>
        <Typography variant='h6'>Create new task</Typography>
        <div className={styles.modal_content}>
          <form className={styles.form}>
            <TextField variant='outlined' label='Title' />
            <FormControl>
              <InputLabel id='select-user'>Assign user</InputLabel>
              <Select
                sx={{ width: '100%' }}
                label='users'
                labelId='select-user'
                displayEmpty
                input={<OutlinedInput label='Assign user' />}
                value={selectedUsers}
                onChange={onUserChange}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={board.users
                          ?.filter((user) => user._id === value)
                          .map((user) => user.name)}
                      />
                    ))}
                  </Box>
                )}
              >
                {board.users?.map((user) => (
                  <MenuItem key={user._id} value={user._id}>
                    {user.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField multiline rows={4} label='Description' />
            <div className={styles.actions}>
              <Button variant='text' sx={{ color: 'black' }} onClick={onClose}>
                Close
              </Button>
              <Button variant='contained'>Create</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default AddTask
