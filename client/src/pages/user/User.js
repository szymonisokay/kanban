import React, { useEffect, useState } from 'react'
import styles from './User.module.css'

import { useParams } from 'react-router-dom'
import { Typography } from '@mui/material'

import UsersService from '../../services/UsersService'
import Loading from '../../components/loading/Loading'

const User = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  const { id } = useParams()

  useEffect(() => {
    setLoading(true)
    const fetchUser = async () => {
      setUser(await UsersService.getUser(id))
      setLoading(false)
    }

    fetchUser()
  }, [id])

  if (loading) {
    return (
      <div className='container flex'>
        <Loading />
      </div>
    )
  }

  return (
    <div className='container'>
      {user && <Typography variant='h6'>{user.name}</Typography>}
    </div>
  )
}

export default User
