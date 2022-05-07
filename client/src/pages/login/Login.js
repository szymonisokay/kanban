import React, { useEffect, useState } from 'react'
import styles from './Login.module.css'
import { Button, Card, TextField, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../features/users/userSlice'
import Loading from '../../components/loading/Loading'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { status } = useSelector((state) => state.users)

  const onFormSubmit = (e) => {
    e.preventDefault()
    dispatch(loginUser({ email, password }))
  }

  useEffect(() => {
    if (status === 'success') {
      navigate('/')
    }
  }, [status])

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
            {status === 'loading' ? <Loading className='white' /> : 'Login'}
          </Button>
        </form>
      </Card>
    </div>
  )
}

export default Login
