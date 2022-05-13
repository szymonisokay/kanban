import React from 'react'
import styles from './Boards.module.css'
import Board from './Board'

const Boards = ({ boards }) => {
  console.log(boards)

  return (
    <>
      <div className={styles.boards__content}>
        {boards.length >= 1 ? (
          boards?.map((board) => <Board key={board._id} {...board} />)
        ) : (
          <p>No boards</p>
        )}
      </div>
    </>
  )
}

export default Boards
