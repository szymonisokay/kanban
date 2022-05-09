import React, { useEffect, useState } from 'react'
import styles from './Register.module.css'
import { Button, Card, TextField, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser, reset, setMessage } from '../../features/users/userSlice'
import Loading from '../../components/loading/Loading'
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
    <div className={styles.container}>
      <Card className={styles.card}>
        <Typography variant='h6'>Create new account</Typography>
        <form onSubmit={onFormSubmit}>
          <div className={styles.form_group}>
            <TextField
              variant='outlined'
              label='Name'
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              variant='outlined'
              label='Email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.form_group}>
            <TextField
              variant='outlined'
              label='Password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              variant='outlined'
              label='Confirm password'
              type='password'
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </div>
          <Button type='submit' variant='contained'>
            {isLoading ? <Loading className='white' /> : 'Register'}
          </Button>
        </form>
      </Card>
      <div className={styles.meta}>
        <Typography variant='subtitle2'>Already have an account?</Typography>
        <Typography variant='subtitle2'>
          <Link to='/login'> Sign in</Link>
        </Typography>
      </div>
    </div>
  )
}

export default Register
