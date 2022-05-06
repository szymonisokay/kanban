import React, { useState } from 'react'
import styles from './Login.module.css'
import { Button, Card, TextField, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../features/users/userSlice'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const onFormSubmit = (e) => {
    e.preventDefault()
    dispatch(loginUser({ email, password }))
  }

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <Typography variant='h6'>Login into your account</Typography>
        <form onSubmit={onFormSubmit}>
          <TextField
            variant='outlined'
            label='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant='outlined'
            label='Password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type='submit' variant='contained'>
            Login
          </Button>
        </form>
      </Card>
    </div>
  )
}

export default Login
