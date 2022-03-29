import React from 'react'
import styles from './Board.module.css'

import AddIcon from '@mui/icons-material/Add'

const dummyStatusData = [
  {
    id: 1,
    name: 'Planned',
    type: 'planned',
  },
  {
    id: 2,
    name: 'In progress',
    type: 'in_progress',
  },
  {
    id: 3,
    name: 'Completed',
    type: 'completed',
  },
]

const Board = ({ id, name }) => {
  return (
    <div className={styles.board}>
      <div className={styles.header}>
        <h3>{name}</h3>
        <button>
          <AddIcon />
          <span>Add new task</span>
        </button>
      </div>
      <div className={styles.tasks}>
        {dummyStatusData.map((status) => (
          <div
            className={`${styles.status_column} ${styles[status.type]}`}
            key={status.id}
          >
            <div className={styles.status_column__header}>
              <span>{status.name}</span>
            </div>
            <div className={styles.tasks_container}>
              <div className={styles.task}>
                <div className={styles.task__header}>Task title</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Board
