import React, { useEffect, useState } from 'react'
import styles from './SingleBoard.module.css'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleBoard, reset } from '../../features/boards/boardSlice'
import { Typography } from '@mui/material'
import Loading from '../loading/Loading'
import Tasks from '../tasks/Tasks'
import StatusService from '../../services/StatusService'

const SingleBoard = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const { boards, isLoading } = useSelector((state) => state.board)

  const [statuses, setStatuses] = useState([])

  useEffect(() => {
    dispatch(getSingleBoard(params.id))
    const fetchStatuses = async () => {
      await StatusService.getStatuses().then((res) => setStatuses(res))
    }

    fetchStatuses()
    return () => {
      dispatch(reset())
    }
  }, [dispatch, params])

  return (
    <section className={isLoading ? 'container flex' : 'container'}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className={styles.board_info}>
            <Typography className={styles.title} variant='h5'>
              {boards.name}
            </Typography>
            <Typography className={styles.desc} variant='body2'>
              {boards?.desc}
            </Typography>
          </div>
          <Tasks tasks={boards?.tasks} statuses={statuses} />
        </>
      )}
    </section>
  )
}

export default SingleBoard
