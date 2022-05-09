import React from 'react'
import styles from './Boards.module.css'
import Board from './Board'

const Boards = ({ boards }) => {
  return (
    <>
      <div className={styles.boards__content}>
        {boards ? (
          boards.map((board) => <Board key={board._id} {...board} />)
        ) : (
          <p>No boards</p>
        )}
      </div>
    </>
  )
}

export default Boards
