import React from 'react'
import styles from './Board.module.css'
import { Link } from 'react-router-dom'

import { MoreVert, AccessTime } from '@mui/icons-material'

import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from '@mui/material'

import moment from 'moment'

const Board = ({ _id, name, desc, users, tasks, createdAt }) => {
  const usersToShow = users.slice(0, 2)
  const usersRest = users.slice(2)

  return (
    <div className={styles.board}>
      {/* <header className={styles.board__header}>
        <Link to={`/boards/${_id}`}>
          <p>
            {name}
            <span>({tasks.length})</span>
          </p>
        </Link>
        <MoreVert />
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
      </div> */}
      <Card>
        <CardHeader
          // avatar={<Avatar>SZ</Avatar>}
          action={
            <IconButton>
              <MoreVert />
            </IconButton>
          }
          title={<Typography variant='body1'>{name}</Typography>}
          subheader={
            <Typography variant='subtitle2' color='gray'>
              {moment(createdAt).format('DD MMM YYYY')}
            </Typography>
          }
        />
        <CardContent>
          <Typography variant='body2' color='gray'>
            {desc}
          </Typography>
        </CardContent>
        <CardActions></CardActions>
      </Card>
    </div>
  )
}

export default Board
