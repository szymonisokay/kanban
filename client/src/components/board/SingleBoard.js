import React, { useEffect } from 'react'
import styles from './SingleBoard.module.css'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleBoard, reset } from '../../features/boards/boardSlice'
import { Typography } from '@mui/material'
import Loading from '../loading/Loading'

const SingleBoard = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const { boards, isSuccess, isLoading } = useSelector((state) => state.board)

  useEffect(() => {
    dispatch(getSingleBoard(params.id))

    return () => {
      dispatch(reset())
    }
  }, [dispatch, params])

  return (
    <section className={styles.single_board}>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={styles.board_info}>
          <Typography>{boards[0].name}</Typography>
        </div>
      )}
    </section>
  )
}

export default SingleBoard
