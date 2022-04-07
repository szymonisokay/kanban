import React, { useEffect } from 'react'
import styles from './Boards.module.css'

import Breadcrumb from '../../components/breadcrumb/Breadcrumb'
import BoardsList from '../../components/board/Boards'

import AddIcon from '@mui/icons-material/Add'
import { useDispatch, useSelector } from 'react-redux'
import { getBoards } from '../../features/boards/boardSlice'
import Loading from '../../components/loading/Loading'

const Boards = () => {
  const dispatch = useDispatch()
  const boards = useSelector((state) => state.board)

  useEffect(() => {
    dispatch(getBoards())
  }, [dispatch])

  console.log(boards)

  return (
    <div className={styles.boards}>
      <header className='header'>
        <Breadcrumb />
      </header>
      {boards.status === 'loading' && <Loading />}
      {boards.status === 'success' && (
        <>
          <BoardsList boards={boards.value} />
          <div className={styles.add_board} title='Add new board'>
            <AddIcon />
          </div>
        </>
      )}
    </div>
  )
}

export default Boards
