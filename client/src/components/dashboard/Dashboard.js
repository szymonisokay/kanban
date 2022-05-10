import React, { useEffect } from 'react'
import styles from './Dashboard.module.css'
import { Link, useNavigate } from 'react-router-dom'

import Boards from '../board/Boards'
import Loading from '../loading/Loading'

import { useDispatch, useSelector } from 'react-redux'
import { getBoards, reset } from '../../features/boards/boardSlice'

import { DashboardCustomize } from '@mui/icons-material'
import { Typography } from '@mui/material'
import Menu from '../menu/Menu'

const actions = [{ icon: <DashboardCustomize />, name: 'Board' }]

const Dashboard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { boards, isLoading, isSuccess } = useSelector((state) => state.board)

  const [open, setOpen] = React.useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleMenuItemClick = () => {
    navigate('/add-board')
  }

  useEffect(() => {
    dispatch(getBoards())

    return () => {
      dispatch(reset())
    }
  }, [dispatch])

  return (
    <div className={styles.dashboard}>
      <Menu
        actions={actions}
        open={open}
        handleClose={handleClose}
        handleOpen={handleOpen}
        handleItemClick={handleMenuItemClick}
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
        {isLoading ? <Loading /> : <Boards boards={boards} />}
      </div>
    </div>
  )
}

export default Dashboard
