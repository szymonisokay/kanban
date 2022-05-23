import React, { useEffect } from 'react'
import styles from './Boards.module.css'

import BoardsList from '../../components/board/Boards'

import { useDispatch, useSelector } from 'react-redux'
import { getBoards, reset } from '../../features/boards/boardSlice'
import Loading from '../../components/loading/Loading'

const Boards = () => {
  const dispatch = useDispatch()
  const { boards, isLoading, isSuccess } = useSelector((state) => state.board)

  useEffect(() => {
    dispatch(getBoards())

    return () => dispatch(reset())
  }, [dispatch, isSuccess])

  return (
    <div className={styles.boards}>
      {isLoading ? <Loading /> : <BoardsList boards={boards} />}
    </div>
  )
}

export default Boards
