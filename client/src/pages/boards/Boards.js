import React, { useEffect, useState } from 'react'
import styles from './Boards.module.css'

import BoardsList from '../../components/board/Boards'

import { useDispatch, useSelector } from 'react-redux'
import { getBoards } from '../../features/boards/boardSlice'
import Loading from '../../components/loading/Loading'
import { DashboardCustomize } from '@mui/icons-material'
import Menu from '../../components/menu/Menu'
import ModalBox from '../../components/modal/ModalBox'

const actions = [{ icon: <DashboardCustomize />, name: 'Board' }]

const Boards = () => {
  const dispatch = useDispatch()
  const boards = useSelector((state) => state.board)

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleItemClick = () => {
    console.log('hello')
  }

  useEffect(() => {
    dispatch(getBoards())
  }, [dispatch])

  return (
    <div className={styles.boards}>
      {boards.status === 'loading' ? (
        <Loading />
      ) : (
        <BoardsList boards={boards.value} />
      )}
      <Menu
        actions={actions}
        open={open}
        handleClose={handleClose}
        handleOpen={handleOpen}
        handleItemClick={handleItemClick}
      />
    </div>
  )
}

export default Boards
