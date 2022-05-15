import React, { useEffect, useRef, useState } from 'react'
import styles from './Tasks.module.css'
import axios from 'axios'
import { Grid } from '@mui/material'
import { Add } from '@mui/icons-material'
import AddTask from './AddTask'

const Tasks = ({ tasks }) => {
  const [statuses, setStatuses] = useState([])
  const [addTask, setAddTask] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState('')
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

  console.log(tasks)
  return (
    <>
      <div className={styles.container}>
        <Grid container spacing={0} className={styles.grid}>
          {statuses?.map((status) => (
            <Grid item key={status._id} xs={12} className={styles.grid_item}>
              {status.type}
              <button
                className={styles.add_btn}
                onClick={() => onAddTask(status._id)}
              >
                <Add />
              </button>
            </Grid>
          ))}
        </Grid>
      </div>
      {addTask && <AddTask status={selectedStatus} onClose={onClose} />}
    </>
  )
}

export default Tasks
