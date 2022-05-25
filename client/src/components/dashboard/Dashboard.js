import React, { useEffect } from 'react'
import styles from './Dashboard.module.css'
import { Link } from 'react-router-dom'

import Boards from '../board/Boards'
import Loading from '../loading/Loading'

import { useDispatch, useSelector } from 'react-redux'
import { getBoards, reset } from '../../features/boards/boardSlice'

import { Typography } from '@mui/material'

const Dashboard = () => {
  const dispatch = useDispatch()
  const { boards, isLoading } = useSelector((state) => state.board)

  useEffect(() => {
    dispatch(getBoards())

    return () => {
      dispatch(reset())
    }
  }, [dispatch])

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboard_content}>
        {boards.length >= 1 && (
          <div className={styles.dashboard_content__header}>
            <Typography variant='h6' color='dark'>
              Boards
            </Typography>
          </div>
        )}
        {isLoading ? <Loading /> : <Boards boards={boards} />}
      </div>
    </div>
  )
}

export default Dashboard
