import React, { useEffect, useState } from 'react'
import styles from './Dashboard.module.css'
import { useSearchParams } from 'react-router-dom'

import NotFound from '../notFound/NotFound'
import Board from '../board/Board'

const dummyBoardData = [
  {
    id: 1,
    name: 'First project',
  },
  {
    id: 2,
    name: 'Second project',
  },
  {
    id: 3,
    name: 'Third project',
  },
]

const Dashboard = () => {
  const [params] = useSearchParams()
  const boardID = +params.get('board')

  const [board, setBoard] = useState({ id: 0, name: '' })

  useEffect(() => {
    const selectedBoard = dummyBoardData.find((board) => board.id === boardID)

    setBoard(selectedBoard)
  }, [boardID])

  console.log(board)
  return (
    <div className={styles.dashboard}>
      {board && <Board {...board} />}
      {!board && <NotFound />}
    </div>
  )
}

export default Dashboard
