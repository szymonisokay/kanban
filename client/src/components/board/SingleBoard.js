import React, { useEffect } from 'react'
import styles from './SingleBoard.module.css'
import { useParams } from 'react-router-dom'
import Breadcrumb from '../breadcrumb/Breadcrumb'
import { useDispatch } from 'react-redux'
import { getSingleBoard } from '../../features/boards/boardSlice'

const SingleBoard = () => {
  const params = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getSingleBoard({ boardName: params.name }))
  }, [dispatch])

  return (
    <div className={styles.single_board}>
      <header className='header'>
        <Breadcrumb />
      </header>
    </div>
  )
}

export default SingleBoard
