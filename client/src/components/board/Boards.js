import React from 'react'
import styles from './Boards.module.css'
import Board from './Board'
import { ReactComponent as BoardImage } from '../../assets/images/board.svg'
import { Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Boards = ({ boards }) => {
  const navigate = useNavigate()

  const navigateTo = () => {
    navigate('/add-board')
  }

  return (
    <>
      <div className={styles.boards__content}>
        {boards.length >= 1 &&
          boards?.map((board) => <Board key={board._id} board={board} />)}
      </div>
      {boards.length === 0 && (
        <div className={styles.no_boards}>
          <BoardImage className={styles.image} />
          <Typography variant='subtitle1' sx={{ marginBottom: '10px' }}>
            Create your first board
          </Typography>
          <Button
            variant='contained'
            className='contained_btn'
            onClick={navigateTo}
          >
            Create
          </Button>
        </div>
      )}
    </>
  )
}

export default Boards
