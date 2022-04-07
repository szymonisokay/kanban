import React from 'react'
import styles from './Board.module.css'
import { Link } from 'react-router-dom'

import MoreVertIcon from '@mui/icons-material/MoreVert'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

import moment from 'moment'

const Board = ({ id, name, desc, users, tasks, createdAt }) => {
  const usersToShow = users.slice(0, 2)
  const usersRest = users.slice(2)

  return (
    <div className={styles.board}>
      <header className={styles.board__header}>
        <Link to={`/boards/${name.replace(' ', '-').toLowerCase()}`}>
          <p>
            {name}
            <span>({tasks.length})</span>
          </p>
        </Link>
        <MoreVertIcon />
      </header>
      <div className={styles.board__content}>
        {desc && <p>{desc.slice(0, 120)}...</p>}
      </div>
      <div className={styles.board__footer}>
        <div className={styles.created}>
          <AccessTimeIcon />
          <span>{moment(createdAt).format('DD MMM YYYY')}</span>
        </div>
        <div className={styles.users}>
          {usersToShow.map((user) => (
            <img
              className={styles.user__img}
              key={user.id}
              src={user.image}
              alt={user.name}
              title={user.name}
            />
          ))}
          {usersRest.length > 0 && <span>+{usersRest.length}</span>}
        </div>
      </div>
    </div>
  )
}

export default Board
