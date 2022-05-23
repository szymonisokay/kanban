import React, { useState, useEffect } from 'react'
import styles from './AddBoard.module.css'

import {
  Typography,
  TextField,
  Select,
  MenuItem,
  Box,
  Chip,
  InputLabel,
  OutlinedInput,
  FormControl,
  Button,
  Card,
  CircularProgress,
} from '@mui/material'

import UsersService from '../../services/UsersService'
import { addBoard, reset } from '../../features/boards/boardSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const AddBoard = () => {
  const [users, setUsers] = useState([])
  const [selectedUsers, setSelectedUsers] = useState([])
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [valueSent, setValueSent] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { boards, isError, message, isLoading, isSuccess } = useSelector(
    (state) => state.board
  )

  const onUserChange = (event) => {
    const {
      target: { value },
    } = event

    setSelectedUsers(typeof value === 'string' ? value.split(',') : value)
  }

  const onSubmit = (event) => {
    event.preventDefault()

    const boardData = {
      name,
      desc,
      users: selectedUsers,
    }

    dispatch(addBoard(boardData))

    if (isError) return

    setName('')
    setDesc('')
    setSelectedUsers([])
    setValueSent(true)
  }

  const fetchUsers = async () => {
    await UsersService.getUsers().then((res) => setUsers(res))
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  useEffect(() => {
    let timeout
    if (isSuccess && valueSent) {
      toast.success('Board created successfully')
      timeout = setTimeout(() => {
        navigate(`/boards/${boards._id}`)
      }, 2000)
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [boards, isSuccess, valueSent, navigate])

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    return () => {
      dispatch(reset())
      setValueSent(false)
    }
  }, [dispatch, isError, message])

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <Typography variant='h6'>Create new board</Typography>
        <form className={styles.form} onSubmit={onSubmit}>
          <TextField
            label='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <FormControl>
            <InputLabel id='select-user'>Assign users</InputLabel>
            <Select
              sx={{ width: '100%' }}
              label='users'
              labelId='select-user'
              multiple
              displayEmpty
              input={<OutlinedInput label='Assign users' />}
              value={selectedUsers}
              onChange={onUserChange}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip
                      key={value}
                      label={users
                        .filter((user) => user._id === value)
                        .map((user) => user.name)}
                    />
                  ))}
                </Box>
              )}
            >
              {users?.map((user) => (
                <MenuItem key={user._id} value={user._id}>
                  {user.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            className={styles.textarea}
            rows={4}
            multiline
            label='Description'
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />

          <Button type='submit' color='primary' variant='contained'>
            {isLoading ? <CircularProgress /> : 'Create'}
          </Button>
        </form>
      </Card>
    </div>
  )
}

export default AddBoard
