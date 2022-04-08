import React, { useEffect, useState } from 'react'
import styles from './Boards.module.css'

import BoardsList from '../../components/board/Boards'

import AddIcon from '@mui/icons-material/Add'
import { useDispatch, useSelector } from 'react-redux'
import { getBoards } from '../../features/boards/boardSlice'
import Loading from '../../components/loading/Loading'
import Modal from '../../components/modal/Modal'

const Boards = () => {
  const dispatch = useDispatch()
  const boards = useSelector((state) => state.board)

  const [showModal, setShowModal] = useState(false)

  const onModalClick = () => {
    setShowModal(true)
  }

  const onCloseModal = () => {
    setShowModal(false)
  }

  useEffect(() => {
    dispatch(getBoards())
  }, [dispatch])

  console.log(boards)

  return (
    <div className={styles.boards}>
      {boards.status === 'loading' && <Loading />}
      {boards.status === 'success' && (
        <>
          <BoardsList boards={boards.value} />
          <div
            className={styles.add_board}
            title='Add new board'
            onClick={onModalClick}
          >
            <AddIcon />
          </div>
          {showModal && (
            <Modal method='add' title='board' onCloseModal={onCloseModal} />
          )}
        </>
      )}
    </div>
  )
}

export default Boards
