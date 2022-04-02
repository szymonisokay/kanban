import React from 'react'
import styles from './Board.module.css'

import AddIcon from '@mui/icons-material/Add'

const Board = ({ id, name, users, tasks }) => {
  return <div className={styles.board}>{name}</div>
}

export default Board
