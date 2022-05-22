import React, { useState } from 'react'
import styles from './Tasks.module.css'
import { Grid, Typography } from '@mui/material'
import { Add } from '@mui/icons-material'
import AddTask from './AddTask'
import Task from './Task'

const Tasks = ({ tasks: localTasks, statuses }) => {
  const [addTask, setAddTask] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState('')
  const [tasks, setTasks] = useState(localTasks)

  const onAddTask = (status) => {
    setAddTask(true)
    setSelectedStatus(status)
  }

  const onClose = () => {
    setAddTask(false)
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
