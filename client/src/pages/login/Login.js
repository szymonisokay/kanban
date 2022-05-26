import React, { useEffect, useState } from 'react'
import styles from './Login.module.css'
import {
  Button,
  Card,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, reset } from '../../features/users/userSlice'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isSuccess, isError, isLoading, message } = useSelector(
    (state) => state.users
  )

  const onFormSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password,
    }
    dispatch(loginUser(userData))
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
    <div className={`container flex ${styles.login}`}>
      <Card className={styles.card}>
        <Typography variant='h6'>Login into your account</Typography>
        <form className={styles.form} onSubmit={onFormSubmit}>
          <TextField
            variant='outlined'
            label='Email'
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
          <Button type='submit' variant='contained'>
            {isLoading ? (
              <CircularProgress
                size={24}
                sx={{ color: (theme) => theme.palette.secondary.main }}
              />
            ) : (
              'Login'
            )}
          </Button>
        </form>
        <div className={styles.meta}>
          <Typography variant='subtitle2'>
            Don't have an account? <Link to='/register'>Sign up</Link>
          </Typography>
        </div>
      </Card>
    </div>
  )
}

export default Login
