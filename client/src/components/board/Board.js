import React from 'react'
import styles from './Board.module.css'

import AddIcon from '@mui/icons-material/Add'

const dummyStatusData = [
  {
    id: 1,
    type: 'Planned',
  },
  {
    id: 2,
    type: 'In progress',
  },
  {
    id: 3,
    type: 'Completed',
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
          <div className={styles.status_column} key={status.id}>
            {status.type}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Board
