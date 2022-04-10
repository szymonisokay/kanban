import React, { useEffect, useState } from 'react'
import styles from './Dashboard.module.css'
import { Link } from 'react-router-dom'

import Boards from '../board/Boards'
import Loading from '../loading/Loading'

import { useDispatch, useSelector } from 'react-redux'
import { getBoards } from '../../features/boards/boardSlice'

import { Add } from '@mui/icons-material'
import { Typography, Fab, Backdrop } from '@mui/material'
import ModalBox from '../modal/Modal'

const Dashboard = () => {
  const dispatch = useDispatch()
  const boards = useSelector((state) => state.board)

  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpen = () => {
    setIsModalOpen(!isModalOpen)
  }

  const handleClose = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    dispatch(getBoards())
  }, [dispatch])

  return (
    <div className={styles.dashboard}>
      {isModalOpen && (
        <ModalBox isOpen={isModalOpen} handleClose={handleClose} />
      )}
      <Fab color='primary' className='global_action_btn' onClick={handleOpen}>
        <Add />
      </Fab>
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
