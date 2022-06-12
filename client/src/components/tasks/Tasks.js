import React, { useState } from 'react'
import styles from './Tasks.module.css'
import { Grid, Typography } from '@mui/material'
import { Add } from '@mui/icons-material'
import AddTask from './AddTask'
import Task from './Task'
import { useDispatch, useSelector } from 'react-redux'
import { createTask } from '../../features/boards/boardAsyncActions'

const Tasks = ({ statuses }) => {
  const [addTask, setAddTask] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState('')

  const { boards: board } = useSelector((state) => state.board)
  const dispatch = useDispatch()

  const onBtnClick = (status) => {
    setAddTask(true)
    setSelectedStatus(status)
  }

  const onClose = () => {
    setAddTask(false)
  }

  const onAddTask = async (data) => {
    const taskData = {
      ...data,
      status: selectedStatus,
      boardId: board._id,
    }

    dispatch(createTask(taskData))
  }

  return (
    <>
      <div className={styles.container}>
        <Grid container spacing={0} className={styles.grid}>
          {statuses?.map((status) => (
            <Grid item key={status._id} xs={12} className={styles.grid_item}>
              <div className={styles.header}>
                <Typography variant='h6'>{status.type}</Typography>
              </div>
              {status.type === 'To Do' && (
                <button
                  className={styles.add_btn}
                  onClick={() => onBtnClick(status._id)}
                >
                  <Add />
                </button>
              )}
              <div className={styles.tasks_content}>
                {board.tasks?.map((task) => {
                  return (
                    task.status._id === status._id && (
                      <Task key={task._id} task={task} statuses={statuses} />
                    )
                  )
                })}
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
      {addTask && <AddTask onClose={onClose} setTask={onAddTask} />}
    </>
  )
}

export default Tasks
