import React, { useEffect } from 'react'
import styles from './SingleBoard.module.css'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getSingleBoard } from '../../features/boards/boardSlice'

const SingleBoard = () => {
  const params = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getSingleBoard({ id: params.id }))
  }, [dispatch, params.id])

  return <div className={styles.single_board}></div>
}

export default SingleBoard
