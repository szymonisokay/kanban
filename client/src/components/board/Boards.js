import React from 'react'
import styles from './Boards.module.css'
import Board from './Board'

const Boards = ({ boards }) => {
  return (
    <>
      <div className={styles.boards__content}>
        {boards.map((board) => (
          <Board key={board.id} {...board} />
        ))}
      </div>
    </>
  )
}

export default Boards
