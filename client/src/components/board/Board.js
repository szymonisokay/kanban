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
  const usersToShow = users?.slice(0, 2)
  const usersRest = users?.slice(2)

  return (
    <div className={styles.board}>
      <Card>
        <CardHeader
          action={
            <IconButton>
              <MoreVert />
            </IconButton>
          }
          title={
            <Typography variant='body1'>
              <Link to={`/boards/${_id}`}>{name}</Link>
            </Typography>
          }
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
        <CardActions className={styles.board__footer}>
          <div className={styles.users}>
            {usersToShow.map((user) =>
              user.image ? (
                <img key={user._id} src={user.image} />
              ) : (
                <Avatar
                  key={user._id}
                  className={styles.user_avatar}
                  title={user.name}
                >
                  {user?.name.charAt(0).toUpperCase()}
                </Avatar>
              )
            )}
            {usersRest.length > 0 && <span>+{usersRest.length}</span>}
          </div>
        </CardActions>
      </Card>
    </div>
  )
}

export default Board
