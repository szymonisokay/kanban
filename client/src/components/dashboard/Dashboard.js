import React, { useEffect } from 'react'
import styles from './Dashboard.module.css'

import Boards from '../board/Boards'
import Loading from '../loading/Loading'

import { useDispatch, useSelector } from 'react-redux'
import { reset } from '../../features/boards/boardSlice'
import { getBoards } from '../../features/boards/boardAsyncActions'

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
    <div className={boards.length ? 'container' : 'container flex'}>
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
