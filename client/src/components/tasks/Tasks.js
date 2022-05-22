import React, { useEffect, useRef, useState } from 'react'
import styles from './Tasks.module.css'
import axios from 'axios'
import { Grid, Typography } from '@mui/material'
import { Add } from '@mui/icons-material'
import AddTask from './AddTask'
import Task from './Task'
import { useSelector } from 'react-redux'

const Tasks = ({ tasks: localTasks }) => {
  const [statuses, setStatuses] = useState([])
  const [addTask, setAddTask] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState('')
  const [tasks, setTasks] = useState(localTasks)

  const source = useRef(axios.CancelToken.source())

  const fetchStatuses = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/tasks/status/',
        {
          cancelToken: source.current.token,
        }
      )

      setStatuses(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const onAddTask = (status) => {
    setAddTask(true)
    setSelectedStatus(status)
  }

  const onClose = () => {
    setAddTask(false)
  }

  useEffect(() => {
    fetchStatuses()

    const cancelToken = source.current

    return () => {
      cancelToken.cancel('Canceled')
    }
  }, [source])

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
                  onClick={() => onAddTask(status._id)}
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
      {addTask && (
        <AddTask
          status={selectedStatus}
          onClose={onClose}
          setTasks={setTasks}
        />
      )}
    </>
  )
}

export default Tasks
