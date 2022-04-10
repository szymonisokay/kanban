import React, { useEffect, useState } from 'react'
import styles from './Dashboard.module.css'
import { Link } from 'react-router-dom'

import Boards from '../board/Boards'
import Loading from '../loading/Loading'

import { useDispatch, useSelector } from 'react-redux'
import { getBoards } from '../../features/boards/boardSlice'

import { DashboardCustomize, GroupAdd } from '@mui/icons-material'
import { Typography } from '@mui/material'
import Menu from '../menu/Menu'

const actions = [
  { icon: <DashboardCustomize />, name: 'Board' },
  { icon: <GroupAdd />, name: 'Team' },
]

const Dashboard = () => {
  const dispatch = useDispatch()
  const boards = useSelector((state) => state.board)

  const [open, setOpen] = React.useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  useEffect(() => {
    dispatch(getBoards())
  }, [dispatch])

  return (
    <div className={styles.dashboard}>
      <Menu
        actions={actions}
        open={open}
        handleClose={handleClose}
        handleOpen={handleOpen}
      />
      <div className={styles.dashboard_content}>
        <div className={styles.dashboard_content__header}>
          <h3>
            <Link to='/boards'>
              <Typography variant='h6' color='dark'>
                Boards
              </Typography>
            </Link>
          </h3>
        </div>
        {boards.status === 'loading' ? (
          <Loading />
        ) : (
          <Boards boards={boards.value} />
        )}

        <div className={styles.dashboard_content__header}>
          <h3>
            <Link to='/teams'>
              <Typography variant='h6' color='dark'>
                Teams
              </Typography>
            </Link>
          </h3>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
