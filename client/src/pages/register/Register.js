import React, { useEffect, useState } from 'react'
import styles from './Register.module.css'
import {
  Button,
  Card,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser, reset, setMessage } from '../../features/users/userSlice'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isSuccess, isError, isLoading, message } = useSelector(
    (state) => state.users
  )

  const onFormSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      dispatch(setMessage('Passwords do not match'))
    }

    const userData = {
      name,
      email,
      password,
    }

    dispatch(registerUser(userData))
  }

  useEffect(() => {
    if (isSuccess) {
      navigate('/')
    }

    if (isError) {
      toast.error(message)
    }

    dispatch(reset())
  }, [isSuccess, isError, navigate, message, dispatch])

  return (
    <div className={`container flex ${styles.register}`}>
      <Card className={styles.card}>
        <Typography variant='h6'>Create new account</Typography>
        <form className={styles.form} onSubmit={onFormSubmit}>
          <TextField
            variant='outlined'
            label='Name'
            type='text'
            value={name}
            size='small'
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            variant='outlined'
            label='Email'
            type='email'
            value={email}
            size='small'
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            variant='outlined'
            label='Password'
            type='password'
            value={password}
            size='small'
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            variant='outlined'
            label='Confirm password'
            type='password'
            value={password2}
            size='small'
            onChange={(e) => setPassword2(e.target.value)}
          />

          <Button type='submit' variant='contained'>
            {isLoading ? (
              <CircularProgress
                size={24}
                sx={{ color: (theme) => theme.palette.secondary.main }}
              />
            ) : (
              'Register'
            )}
          </Button>
        </form>
        <div className={styles.meta}>
          <Typography variant='subtitle2'>
            Already have an account?
            <Link to='/login'> Sign in</Link>
          </Typography>
        </div>
      </Card>
    </div>
  )
}

export default Register
