import React, { useEffect, useState } from 'react'
import styles from './Boards.module.css'

import BoardsList from '../../components/board/Boards'

import { useDispatch, useSelector } from 'react-redux'
import { getBoards, reset } from '../../features/boards/boardSlice'
import Loading from '../../components/loading/Loading'
import { DashboardCustomize } from '@mui/icons-material'
import Menu from '../../components/menu/Menu'

const actions = [{ icon: <DashboardCustomize />, name: 'Board' }]

const Boards = () => {
  const dispatch = useDispatch()
  const { boards, isLoading, isSuccess } = useSelector((state) => state.board)

  const [open, setOpen] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleItemClick = () => setOpenModal(true)
  const handleModalClose = () => setOpenModal(false)

  useEffect(() => {
    dispatch(getBoards())

    // return () => dispatch(reset())
  }, [dispatch, isSuccess])

  return (
    <div className={styles.boards}>
      {isLoading ? <Loading /> : <BoardsList boards={boards} />}
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
