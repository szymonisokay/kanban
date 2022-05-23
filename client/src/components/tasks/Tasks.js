import React, { useState } from 'react'
import styles from './Tasks.module.css'
import { Grid, Typography } from '@mui/material'
import { Add } from '@mui/icons-material'
import AddTask from './AddTask'
import Task from './Task'
import { useSelector } from 'react-redux'
import TasksService from '../../services/TasksService'

const Tasks = ({ tasks: localTasks, statuses }) => {
  const [addTask, setAddTask] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState('')
  const [tasks, setTasks] = useState(localTasks)

  const { boards: board } = useSelector((state) => state.board)
  const { user } = useSelector((state) => state.users)

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

    await TasksService.createTask(taskData, user.token).then((res) => {
      setTasks((prev) => [...prev, res])
      setAddTask(false)
    })
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
                {tasks?.map((task) => {
                  return (
                    task.status._id === status._id && (
                      <Task
                        key={task._id}
                        task={task}
                        statuses={statuses}
                        updateTask={setTasks}
                      />
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
